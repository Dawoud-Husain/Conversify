import MessageContainer from "../../components/messages/MessageContainer";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Navbar />
			<MessageContainer />
		</div>
	);
};
export default Home;
