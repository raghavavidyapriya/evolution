import React, { useState, useContext, useEffect, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ menu, setMenu, setShowLogin }) => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("Logged out successfully");
  };

  const onclickHandlerCart = () => {
    if (getTotalCartAmount() === 0) {
      navigate("/");
      toast.info("Your cart is empty");
    } else {
      setMenu("accessories");
      navigate("/cart");
      setTimeout(() => {
        document.getElementById("cart").scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(()=>{
    toast("Hosted on a free server—please wait up to 30 seconds for full loading. Thank you for your patience!")
  },[])

  return (
    <div className="navbar-custom">
      <img
        onClick={() => {
          setMenu("home");
          navigate("/");
          setTimeout(() => {
            document.getElementById("header").scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
        className="logo"
        src={assets.logo_name}
        alt="Logo"
      />

      <ul className="navbar-menu">
        <li
          onClick={() => {
            setMenu("home");
            navigate("/", { replace: false });
            setTimeout(() => {
              document.getElementById("header").scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => {
            setMenu("accessories");
            navigate("/", { replace: false });
            setTimeout(() => {
              document.getElementById("cars-display").scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          className={menu === "accessories" ? "active" : ""}
        >
          Accessories
        </li>
        <li
          onClick={() => {
            setMenu("mobileapp");
            navigate("/", { replace: false });
            setTimeout(() => {
              document.getElementById("app-download").scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          className={menu === "mobileapp" ? "active" : ""}
        >
          Mobile App
        </li>
        <li
          onClick={() => {
            setMenu("contact");
            navigate("/", { replace: false });
            setTimeout(() => {
              document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          className={menu === "contact" ? "active" : ""}
        >
          Contact Us
        </li>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <img
            className="basket-icon"
            onClick={onclickHandlerCart}
            src={assets.basket_icon}
            alt="Basket Icon"
          />
          <div className={getTotalCartAmount() ? "dot" : ""}></div>
        </div>
        {!token ? (
          <button className="get-in" onClick={() => setShowLogin(true)}>
            Account
          </button>
        ) : (
          <div className="navbar-profile" ref={dropdownRef}>
            <img
              className="profile-icon"
              src={assets.profile_icon}
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <ul className="navbar-profile-dropdown">
                <li
                  onClick={() => {
                    setMenu("home");
                    setDropdownOpen(false);
                    navigate("/", { replace: false });
                    setTimeout(() => {
                      document.getElementById("home").scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="home-icon"
                >
                  <img className="home-icon-img" src={assets.home}/>
                  <p>Home</p>
                </li>
                <li
                  onClick={() => {
                    setMenu("accessories");
                    setDropdownOpen(false);
                    navigate("/myorders", { replace: false });
                    setTimeout(() => {
                      document.getElementById("my-orders-top").scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="bag-icon"
                >
                  <img className="bag-icon-img" src={assets.bag_icon} alt="Bag Icon" />
                  <p>Orders</p>
                </li>
                <li className="logout-icon" 
                  onClick={() => {
                    logout();
                    setDropdownOpen(false); 
                  }}>
                  <img src={assets.logout_icon} className="logout-icon-img" alt="Logout Icon" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
