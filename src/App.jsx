import { Outlet, NavLink } from "react-router";
import "./assets/all.css";
import Icon from "./Component/Icon";

function App() {
  const activeClass = ({ isActive }) => {
    return isActive ? "linkIsActive" : "";
  };
  const basket_yellow = <Icon type="basket_yellow" />;
  const navbarMenuItems = [
    { to: "", menu: "首頁" },
    { to: "/news", menu: "最新消息" },
    { to: "/products", menu: "商品" },
    { to: "/support", menu: "幫助中心" },
    { to: "/admin_login", menu: "註冊/登入" },
    { to: "/cart", menu: basket_yellow },
  ];
  return (
    <>
      <div className="layout">
        <div className="main-wrapper">
          <nav className="navbar">
            <div className="nav-container">
              <div className="nav-left-group">
                <Icon type="logo" />
                <div className="download-btns-container">
                  <Icon type="btn_appStore" />
                  <Icon type="btn_googlePlay" />
                </div>
              </div>
              <div className="navbar-menu">
                {navbarMenuItems.map((navbarMenuItem) => (
                  <div className="navbar-menu-items" key={navbarMenuItem.to}>
                    <div>
                      <NavLink to={navbarMenuItem.to} className={activeClass}>
                        {navbarMenuItem.menu}
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
              {/* <NavLink to="/products" className={activeClass}>
                Product
              </NavLink>{" "}
              |<NavLink to="/cart">Cart</NavLink> |
              <NavLink to="/news">news</NavLink> | */}
            </div>
          </nav>
          <main className="main-content">
            <Outlet />
          </main>
          <footer className="footer-wrapper">
            <div className="footer_bottom">
              <div className="footer_left"></div>
              <div className="footer_middle">
                Ⓒ 2021 Hiromu Arakawa/SQUARE ENIX CO., LTD. All
                <br />
                Rights Reserved.
                <br />
                Copyright © Garena Online.
                <br />
                Trademarks belong to their respective owners. All Rights
                <br />
                Reserved."
              </div>
              <img
                src="images/15.jpg"
                style={{
                  height: "40px",
                  width: "40px",
                  margin: "0 20px 0 50px",
                }}
              />
              <div className="footer_right">
                本遊戲部分內容涉及性、暴力、棋奕、戀愛交友之情節,依遊戲軟體分級管理辦法分類為輔12級。
                本遊戲由Pixel Mart營運。
                請注意遊戲時間,避免沉迷於遊戲,可能影響身心健康。
                <span style={{ color: "crimson" }}>
                  本遊戲服務區域為台灣、香港、澳門。"
                </span>
              </div>
            </div>

            <div className="app_icon"></div>
            <div className="garena_icon"></div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
