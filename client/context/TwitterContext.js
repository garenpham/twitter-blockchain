import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { client } from '../lib/client';
import ProgressBar from '@badrap/bar-of-progress';

export const TwitterContext = createContext();

export const TwitterProvider = ({ children }) => {
	const [appStatus, setAppStatus] = useState('loading');
	const [currentAccount, setCurrentAccount] = useState('');
	const [tweets, setTweets] = useState([]);
	const [currentUser, setCurrentUser] = useState({});

	const router = useRouter();

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	useEffect(() => {
		if (!currentAccount || appStatus !== 'connected') return;
		getCurrentUserDetails(currentAccount);
		fetchTweets();
	}, [currentAccount, appStatus]);

	/**
	 * Progress bar animation for loading screen
	 */
	const progress = new ProgressBar({
		size: 4,
		color: '#1d9bf0',
		className: 'z-50',
		delay: 100,
	});

	/**
	 * Check if there is an active Metamask connection
	 */
	const checkIfWalletIsConnected = async () => {
		if (!window.ethereum) return setAppStatus('noMetaMask');
		try {
			const addressArray = await window.ethereum.request({
				method: 'eth_accounts',
			});
			if (addressArray.length > 0) {
				setAppStatus('connected');
				setCurrentAccount(addressArray[0]);
				createUserAccount(addressArray[0]);
			} else {
				router.push('/');
				setAppStatus('notConnected');
			}
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * Initiates MetaMask wallet connection
	 */
	const connectToWallet = async () => {
		if (!window.ethereum) return setAppStatus('noMetaMask');
		try {
			setAppStatus('loading');

			const addressArray = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});

			if (addressArray.length > 0) {
				setAppStatus('connected');
				setCurrentAccount(addressArray[0]);
				createUserAccount(addressArray[0]);
			} else {
				router.push('/');
				setAppStatus('notConnected');
			}
		} catch (error) {
			setAppStatus('error');
		}
	};

	/**
	 * Creates an account in Sanity DB if the user does not already have one
	 * @param {String} userWalletAddress of the currently active user
	 */
	const createUserAccount = async (userWalletAddress = currentAccount) => {
		if (!window.ethereum) return setAppStatus('noMetaMask');
		try {
			const userDoc = {
				_type: 'users',
				_id: userWalletAddress,
				name: `${userWalletAddress.slice(0, 4)}..${userWalletAddress.slice(
					-4,
				)}`,
				isProfileImageNft: false,
				profileImage:
					'https://img.freepik.com/premium-vector/smile-icon-smile-logo-vector-design-happy-emoticon-business-funny-design-vector-emoji-happiness_6415-3544.jpg',
				coverImage: `https://www.scaler.com/topics/images/hello-world-program-in-python.webp`,
				walletAddress: userWalletAddress,
			};

			await client.createIfNotExists(userDoc);
			setAppStatus('connected');
		} catch (error) {
			router.push('/');
			setAppStatus('error');
		}
	};

	const getProfileImageUrl = async (imageUri, isNft) => {
		if (isNft) {
			return `https://gateway.pinata.cloud/ipfs/${imageUri}`;
		} else {
			return imageUri;
		}
	};

	const fetchTweets = async () => {
		const query = `
			*[_type == "tweets"]{
				"author": author->{name,walletAddress,profileImage,isProfileImageNft}, tweet, timestamp
			}|order(timestamp desc)
		`;

		const sanityResponse = await client.fetch(query);

		setTweets([]);

		sanityResponse.forEach(async (item) => {
			const profileImageUri = await getProfileImageUrl(
				item.author.profileImage,
				item.author.isProfileImageNft,
			);

			const newItem = {
				tweet: item.tweet,
				timestamp: item.timestamp,
				author: {
					name: item.author.name,
					walletAddress: item.author.walletAddress,
					isProfileImageNft: item.author.isProfileImageNft,
					profileImage: profileImageUri,
				},
			};

			setTweets((prevState) => [...prevState, newItem]);
		});
	};

	const getCurrentUserDetails = async (userAccount = currentAccount) => {
		if (appStatus !== 'connected') return;

		const query = `
			*[_type == "users" && _id == "${userAccount}"]{
				"tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
				name,
				profileImage,
				isProfileImageNft,
				coverImage,
				walletAddress
			}
		`;

		const sanityResponse = await client.fetch(query);

		const profileImageUrl = await getProfileImageUrl(
			sanityResponse[0].profileImage,
			sanityResponse[0].isProfileImageNft,
		);

		setCurrentUser({
			tweets: sanityResponse[0].tweets,
			name: sanityResponse[0].name,
			profileImage: profileImageUrl,
			isProfileImageNft: sanityResponse[0].isProfileImageNft,
			coverImage: sanityResponse[0].coverImage,
			walletAddress: sanityResponse[0].walletAddress,
		});
	};

	return (
		<TwitterContext.Provider
			value={{
				appStatus,
				currentAccount,
				connectToWallet,
				tweets,
				fetchTweets,
				setAppStatus,
				getProfileImageUrl,
				currentUser,
				getCurrentUserDetails,
				progress,
			}}>
			{children}
		</TwitterContext.Provider>
	);
};
