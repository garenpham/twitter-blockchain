import { useContext } from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { FaRegComment, FaRetweet } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShare } from 'react-icons/fi';
import { FiTrash } from 'react-icons/fi';
import { format } from 'timeago.js';
import { TwitterContext } from '../context/TwitterContext';
import { client } from '../lib/client';

const style = {
	wrapper: `flex p-3 border-b border-[#38444d]`,
	profileImage: `rounded-full h-[40px] w-[40px] object-cover`,
	postMain: `flex-1 px-4`,
	headerDetails: `flex items-center`,
	name: `font-bold mr-1`,
	verified: `text-[0.8rem]`,
	handleAndTimeAgo: `text-[#8899a6] ml-1`,
	tweet: `my-2 break-all cursor-text`,
	image: `rounded-3xl`,
	footer: `flex justify-between mr-28 mt-4 text-[#8899a6]`,
	footerIcon: `rounded-full text-lg p-2`,
};
//1
const Post = ({
	displayName,
	userName,
	text,
	avatar,
	timestamp,
	isProfileImageNft,
}) => {
	const { currentAccount, fetchTweets, getCurrentUserDetails, progress } =
		useContext(TwitterContext);
	const removePost = async () => {
		progress.start();
		const currentTweetQuery = `*[ _type == "tweets" && timestamp == '${timestamp}' ]`;
		const currentUserQuery = `
			*[_type == "users" && _id == "${currentAccount}"]{
				"tweets": tweets[]->{_id,timestamp, tweet}
			}
		`;
		const currentTweet = await client.fetch(currentTweetQuery);
		console.log(currentTweet);

		const userTweets = await client.fetch(currentUserQuery);
		console.log(userTweets);

		let idx;

		userTweets[0].tweets.forEach((tweet, index) => {
			if (tweet._id == currentTweet[0]._id) {
				idx = index;
			}
		});

		await client
			.patch(currentAccount)
			.unset([`tweets[${idx}]`])
			.commit()
			.then(async () => {
				await client
					.delete(currentTweet[0]._id)
					.then(() => {
						fetchTweets();
						getCurrentUserDetails();
						progress.finish();
					})
					.catch((err) => {
						console.error('Delete failed: ', err.message);
						progress.finish();
						alert("Error: Cannot delete other user's tweet");
					});
			})
			.catch((err) => {
				console.error('Delete failed: ', err.message);
				progress.finish();
			});
	};
	return (
		<div className={style.wrapper}>
			<div>
				<img
					src={avatar}
					alt={userName}
					className={
						isProfileImageNft
							? `${style.profileImage} smallHex`
							: style.profileImage
					}
				/>
			</div>
			<div className={style.postMain}>
				<div>
					<span className={style.headerDetails}>
						<span className={style.name}>{displayName}</span>
						{isProfileImageNft && (
							<span className={style.verified}>
								<BsFillPatchCheckFill />
							</span>
						)}
						<span className={style.handleAndTimeAgo}>
							@{userName} • {format(new Date(timestamp).getTime())}
						</span>
					</span>
					<div className={style.tweet}>{text}</div>
				</div>
				<div className={style.footer}>
					<div
						className={`${style.footerIcon} hover:text-[#1d9bf0] hover:bg-[#1e364a]`}>
						<FaRegComment />
					</div>
					<div
						className={`${style.footerIcon} hover:text-[#03ba7c] hover:bg-[#1b393b]`}>
						<FaRetweet />
					</div>
					<div
						className={`${style.footerIcon} hover:text-[#f91c80] hover:bg-[#39243c]`}>
						<AiOutlineHeart />
					</div>
					<div
						className={`${style.footerIcon} hover:text-[#1d9bf0] hover:bg-[#1e364a]`}>
						<FiShare />
					</div>
					<button
						onClick={removePost}
						className={`${style.footerIcon} text-[#f91c80] hover:bg-[#1e364a68] active:bg-[#1e364ac9] active:scale-90 transition transform duration-200 ease-in`}>
						<FiTrash />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Post;
