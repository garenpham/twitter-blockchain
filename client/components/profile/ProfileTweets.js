import Post from '../Post';
import { useContext, useEffect } from 'react';
import { TwitterContext } from './../../context/TwitterContext';

const style = {
	wrapper: `no-scrollbar`,
	header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
	headerTitle: `text-xl font-bold`,
};

const ProfileTweets = () => {
	const { currentUser, currentAccount } = useContext(TwitterContext);

	return (
		<div className={style.wrapper}>
			{currentUser.tweets?.map((tweet, index) => (
				<Post
					key={index}
					displayName={
						currentUser.name === 'Unnamed'
							? currentUser.walletAddress
							: currentUser.name
					}
					userName={`${currentAccount.slice(0, 4)}...${currentAccount.slice(
						-4,
					)}`}
					text={tweet.tweet}
					avatar={currentUser.profileImage}
					isProfileImageNft={currentUser.isProfileImageNft}
					timestamp={tweet.timestamp}
				/>
			))}
		</div>
	);
};

export default ProfileTweets;
