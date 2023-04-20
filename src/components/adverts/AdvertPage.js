import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';

const AdvertPage = () => {
  const params = useParams();
  return (
    <Layout title="Advert detail">
      <div>
        Advert Detail
        {params.advertId}
      </div>
    </Layout>
  );
};

export default AdvertPage;
