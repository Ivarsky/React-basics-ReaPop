import Header from './Header';

// eslint-disable-next-line react/prop-types
const Layout = ({ title, children }) => {
  return (
    <div>
      <Header />
      <main>
        <h2>{title}</h2>
        {children}
      </main>
      <footer>@ 2023 Ivan Martin</footer>
    </div>
  );
};

export default Layout;
