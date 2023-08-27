import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { deleteCartItemAsync, selectCartItems, updateCartAsync } from './cartSlice';

export default function Cart() {

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems)
  const totalAmount = cartItems.reduce((amount, item) => item.price * item.quantity + amount, 0)
  const totalItems = cartItems.reduce((qty, item) => item.quantity + qty, 0)

  const handleQty = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }))
  }
  const handleRemove = (e, itemId) => {
    dispatch(deleteCartItemAsync(itemId))
  }

  return (

    <div className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8 bg-white">
      {!cartItems.length && <Navigate to="/" replace={true}></Navigate>}

      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mt-6 mb-1 text-center">Cart</h1>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-6">

        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={item.href}>{item.title}</a>
                      </h3>
                      <p className="ml-4">$ {item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-black-500">
                      <label htmlFor="qty" className="block text-sm font-medium leading-6 mb-2 text-gray-900">
                        Qty
                      </label>
                      <select onChange={(e) => handleQty(e, item)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={e => handleRemove(e, item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalAmount}</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total Items Qty</p>
          <p>{totalItems} items</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <Link to='/'>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}