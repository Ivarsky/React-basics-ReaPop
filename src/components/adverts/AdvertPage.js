import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';

const AdvertPage = props => {
  const params = useParams();
  return (
    <Layout title="Advert detail" {...props}>
      <div>
        Advert Detail
        {params.advertId}
      </div>
    </Layout>
  );
};

export default AdvertPage;
