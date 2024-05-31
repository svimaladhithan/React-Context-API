import React, { useContext } from "react";
import { mycontext } from "../App";
import "../index.css";

const CartPage = () => {
  const [data, setData] = useContext(mycontext);
  const totalPrice = data.reduce(
    (total, data) => total + data.price * (data.quantity || 1),
    0
  );
  const totalQuantity = data.reduce(
    (total, data) => total + (data.quantity || 1),
    0
  );
  const handleInc = (id, quantity) => {
    setData((current) => {
      return current.map((element) => {
        if (element.id === id) {
          return { ...element, quantity: element.quantity + 1 || quantity + 1 };
        }
        return element;
      });
    });
  };
  const handleDec = (id, quantity) => {
    setData((current) => {
      return current.map((element) => {
        if (element.id === id && quantity > 1) {
          return { ...element, quantity: element.quantity - 1 || quantity - 1 };
        }
        return element;
      });
    });
  };
  const handleRemove = (id) => {
    setData(data.filter((ele) => ele.id != id));
  };
  return (
    <div>
       <div className="container p-5">
        <div className="row p-5">
          <div className="col-md-12">
      <div className="header">
        <h1 className="title text-center mt-2 mb-5 ">CartPage</h1>
        <div className="d-flex justify-content-between align-content-center flex-wrap px-5">
          <h3 className="total">Total Quantity:</h3>
          <h3> {totalQuantity}</h3>
        </div>
        <br />
        <div className="d-flex justify-content-between align-content-center flex-wrap px-5">
        <h3 className="total">Total Price:</h3><h3> {totalPrice}</h3>
        </div>
      </div>
      {data.map((element, index) => {
        return (
          <div key={index}
            className="main-card mb-3 shadow overflow-auto"
            style={{ maxWidth: 1500 }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <div className="img-box text-center mt-5">
                  <img
                    src={element.images}
                    className="img-fluid rounded-start"
                    alt="product image"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{element.title}</h5>
                  <p className="card-text">
                    <small className="text-muted">{element.category}</small>
                  </p>
                  <p className="card-text">{element.description}</p>
                  <button
                    className="Inc"
                    onClick={() => handleInc(element.id, element.quantity || 1)}
                  >
                    +
                  </button>
                  &nbsp;
                  <span> {element.quantity || 1} </span>
                  &nbsp;
                  <button
                    className="Dec"
                    onClick={() => handleDec(element.id, element.quantity || 1)}
                  >
                    -
                  </button>
                  <hr />
                  <div className="d-flex justify-content-between align-content-center flex-wrap">
                    <h3 className="text-muted">Shipping:</h3>
                    <h3>FREE</h3>
                  </div>
                  <div className="d-flex justify-content-between align-content-center flex-wrap">
                    <h3 className="text-muted">Sub-total: </h3>
                    <h3>
                      ${element.price * element.quantity || element.price}.00
                    </h3>
                  </div>
                  <hr />
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(element.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
    </div>
    </div>
  );
};

export default CartPage;
