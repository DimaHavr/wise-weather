import Box from 'components/Box';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{ gap: '10px', paddingTop: '30px' }}
    >
      <h2>Not Found Page</h2>
      <img
        src="https://games.24tv.ua/resources/photos/news/202212/2222579.jpg"
        alt="pika face"
        max-width="420"
        height="200"
      />
      <Link to="/">Wise Weather</Link>
    </Box>
  );
};
export default NotFoundPage;
