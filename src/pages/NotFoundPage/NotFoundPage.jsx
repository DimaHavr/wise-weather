import Box from 'components/Box';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <h2>Not Found Page</h2>
      <img
        src="https://games.24tv.ua/resources/photos/news/202212/2222579.jpg"
        alt="pika face"
        width="400"
        height="200"
      />
      <Link to="/">Home</Link>
    </Box>
  );
};
export default NotFoundPage;
