import Header from './Header.jsx';

function Layout({ children }) {
  return <>
    <Header />
    <div className="page-container container">
      {children}
    </div>
  </>;
}

export default Layout;
