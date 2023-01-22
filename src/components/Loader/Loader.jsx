import { ThreeDots } from 'react-loader-spinner';
import { LoaderIcon } from './Loader.styled';
export const Loader = () => {
  return (
    <LoaderIcon>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#fff"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </LoaderIcon>
  );
};
export default Loader;
