import { useContext } from 'react'
import { BsStars } from 'react-icons/bs'
import TweetBox from './TweetBox'
import Post from '../Post'
import { TwitterContext } from '../../context/TwitterContext'

const style = {
	// wrapper: `flex-[2] border-r border-l border-[#38444d] l-50-px ml-[18vw]`,
	wrapper: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
	header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
	headerTitle: `text-xl font-bold`,
}

// const tweets = [
// 	{
// 		displayName: 'PhamMinhTan',
// 		username: '0xE0109e4f2d5682011384AE8114c919BA1c7F9086',
// 		avatar:
// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg/1200px-B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg',
// 		text: 'gm',
// 		isProfileImageNft: false,
// 		timestamp: '2022-11-01T12:00:00.000Z',
// 	},
// 	{
// 		displayName: 'PhamMinhTan',
// 		username: '0xE0109e4f2d5682011384AE8114c919BA1c7F9086',
// 		avatar:
// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg/1200px-B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg',
// 		text: 'gm',
// 		isProfileImageNft: false,
// 		timestamp: '2020-06-01T12:00:00.000Z',
// 	},
// 	{
// 		displayName: 'PhamMinhTan',
// 		username: '0xE0109e4f2d5682011384AE8114c919BA1c7F9086',
// 		avatar:
// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg/1200px-B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg',
// 		text: 'gm',
// 		isProfileImageNft: false,
// 		timestamp: '2020-06-01T12:00:00.000Z',
// 	},
// 	{
// 		displayName: 'PhamMinhTan',
// 		username: '0xE0109e4f2d5682011384AE8114c919BA1c7F9086',
// 		avatar:
// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg/1200px-B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg',
// 		text: 'gm',
// 		isProfileImageNft: false,
// 		timestamp: '2020-06-01T12:00:00.000Z',
// 	},
// 	{
// 		displayName: 'PhamMinhTan',
// 		username: '0xE0109e4f2d5682011384AE8114c919BA1c7F9086',
// 		avatar:
// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg/1200px-B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg',
// 		text: 'gmasdasdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdaaaaaaaaaaaaaaaaaaaaaaaaadasdasd',
// 		isProfileImageNft: false,
// 		timestamp: '2022-11-01T12:00:00.000Z',
// 	},
// 	{
// 		displayName: 'PhamMinhTan',
// 		username: '0xE0109e4f2d5682011384AE8114c919BA1c7F9086',
// 		avatar:
// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg/1200px-B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg',
// 		text: 'gmasdasdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdaaaaaaaaaaaaaaaaaaaaaaaaadasdasd',
// 		isProfileImageNft: false,
// 		timestamp: '2022-11-01T12:00:00.000Z',
// 	},
// 	{
// 		displayName: 'PhamMinhTan',
// 		username: '0xE0109e4f2d5682011384AE8114c919BA1c7F9086',
// 		avatar:
// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg/1200px-B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg',
// 		text: 'gmasdasdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdaaaaaaaaaaaaaaaaaaaaaaaaadasdasd',
// 		isProfileImageNft: false,
// 		timestamp: '2022-11-01T12:00:00.000Z',
// 	},
// 	{
// 		displayName: 'PhamMinhTan',
// 		username: '0xE0109e4f2d5682011384AE8114c919BA1c7F9086',
// 		avatar:
// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg/1200px-B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg',
// 		text: 'gmasdasdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdaaaaaaaaaaaaaaaaaaaaaaaaadasdasd',
// 		isProfileImageNft: false,
// 		timestamp: '2022-11-01T12:00:00.000Z',
// 	},
// 	{
// 		displayName: 'PhamMinhTan',
// 		username: '0xE0109e4f2d5682011384AE8114c919BA1c7F9086',
// 		avatar:
// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg/1200px-B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing_%28cropped%29.jpg',
// 		text: 'gmasdasdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdaaaaaaaaaaaaaaaaaaaaaaaaadasdasd',
// 		isProfileImageNft: false,
// 		timestamp: '2022-11-01T12:00:00.000Z',
// 	},
// ]

function Feed() {
	const { tweets } = useContext(TwitterContext)
	return (
		<div className={style.wrapper}>
			<div className={style.header}>
				<div className={style.headerTitle}>Home</div>
				<BsStars />
			</div>
			<TweetBox />

			{/*
				Get tweets from Sanity by TwitterContext
			*/}

			{tweets.map((tweet, index) => (
				<Post
					key={index}
					displayName={
						tweet.author.name === 'Unnamed'
							? `${tweet.author.walletAddress.slice(
									0,
									4,
							  )}...${tweet.author.walletAddress.slice(41)}`
							: tweet.author.name
					}
					userName={`${tweet.author.walletAddress.slice(
						0,
						4,
					)}...${tweet.author.walletAddress.slice(-4)}`}
					avatar={tweet.author.profileImage}
					text={tweet.tweet}
					isProfileImageNft={tweet.author.isProfileImageNft}
					timestamp={tweet.timestamp}
				/>
			))}
		</div>
	)
}

export default Feed
