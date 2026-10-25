import Header from './Header.jsx';

function Layout({ children }) {
  return <>
    <Header />
    <div className="page-container container-fluid">
      {children}
    </div>
  </>;
}

export default Layout;
