import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

const Checkout = () => {
  const { total } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pinCode: '',
  });

  const [errors, setErrors] = useState({});

  // Load saved address details from localStorage (if available)
  useEffect(() => {
    const savedData = localStorage.getItem('checkoutForm');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) 
      newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) 
      newErrors.email = 'Enter a valid email';
    if (!formData.address1.trim()) newErrors.address1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pinCode.trim() || !/^\d{6}$/.test(formData.pinCode)) 
      newErrors.pinCode = 'Enter a valid 6-digit PIN Code';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      localStorage.setItem('checkoutForm', JSON.stringify(formData)); // Save form data
      console.log('Order Placed:', formData);
      navigate(`/order-confirmation`);
    }
  };

  return (
    <div className='px-4 sm:px-12 lg:px-16 py-8 flex justify-center'>
      <div className='bg-white border border-gray-200 rounded-lg p-6 w-full max-w-3xl shadow-md'>
        <Link to='/cart' className='text-black flex items-center text-sm mb-6'>
          <FiChevronLeft className='mr-2 text-lg' />
          Back to cart
        </Link>

        <div className='relative inline-block mb-6 py-3'>
          <h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
            CHECK <span className='font-bold'>OUT</span>
          </h2>
          <span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
        </div>

        <p className='text-md font-semibold mb-4'>Total Amount: <span className="text-green-600">₹{total}</span></p>

        <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {[
            { name: 'firstName', placeholder: 'First Name' },
            { name: 'lastName', placeholder: 'Last Name' },
            { name: 'phone', placeholder: 'Phone Number' },
            { name: 'email', placeholder: 'Email Address' },
          ].map(({ name, placeholder }) => (
            <div key={name}>
              <input
                type={name === 'email' ? 'email' : 'text'}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className={`border p-2 rounded w-full ${errors[name] ? 'border-red-500' : 'border-gray-400'}`}
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}

          <div className="sm:col-span-2">
            <input
              type="text"
              name="address1"
              placeholder="Address Line 1"
              value={formData.address1}
              onChange={handleChange}
              className={`border p-2 rounded w-full ${errors.address1 ? 'border-red-500' : 'border-gray-400'}`}
            />
            {errors.address1 && <p className="text-red-500 text-sm">{errors.address1}</p>}
          </div>

          <input
            type="text"
            name="address2"
            placeholder="Address Line 2 (Optional)"
            value={formData.address2}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded w-full sm:col-span-2"
          />

          {[
            { name: 'city', placeholder: 'City' },
            { name: 'state', placeholder: 'State' },
            { name: 'pinCode', placeholder: 'PIN Code' },
          ].map(({ name, placeholder }) => (
            <div key={name} className={name === 'pinCode' ? 'sm:col-span-2' : ''}>
              <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className={`border p-2 rounded w-full ${errors[name] ? 'border-red-500' : 'border-gray-400'}`}
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}

          <button
            type="submit"
            className='col-span-2 px-4 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded transition'
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
