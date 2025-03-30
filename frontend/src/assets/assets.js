import bin_icon from './Icons/bin_icon.png'
import dropdown_icon from './Icons/dropdown_icon.png'
import dropup_icon from './Icons/dropup_icons.png'
import menu_icon from './Icons/menu_icon.png'
import cross_icon from './Icons/cross_icon.png'
import success_icon from './Icons/circle.png'

import logo from './OtherImages/logo.jpg'
import hero_img from './OtherImages/hero_image.jpg'
import about_us_img from './OtherImages/about_us.jpg'

import dairyBread from './HomeCategories/1.png'
import fruitsVeg from './HomeCategories/2.png'
import drinksJuice from './HomeCategories/3.png'
import snacksMunchies from './HomeCategories/4.png'
import bakeryBiscuits from './HomeCategories/5.png'
import saucesSpreads from './HomeCategories/6.png'
import pharmaWellness from './HomeCategories/7.png'
import personalCare from './HomeCategories/8.png'
import cleaningEssentials from './HomeCategories/9.png'
import homeOffices from './HomeCategories/10.png'

import prod1 from './ProductImages/amul-taaza.jpg'
import prod2 from './ProductImages/amul-malai-fresh-paneer.webp'
import prod3 from './ProductImages/amul-cheese-cubes.jpg'
import prod4 from './ProductImages/tasties-brown-bread.jpg'
import prod5 from './ProductImages/farm-white-eggs.webp'

import prod6 from './ProductImages/apples.webp'
import prod7 from './ProductImages/mixed-capsicum.jpg'
import prod8 from './ProductImages/potato.jpg'
import prod9 from './ProductImages/pineapple.jpg'
import prod10 from './ProductImages/curry-leaves.jpg'

import prod11 from './ProductImages/lays-potato-chips-indias-masala-magic.webp'
import prod12 from './ProductImages/namkeen-chaat-papdi.jpg'
import prod13 from './ProductImages/fresho-signature-chilly-cheese-toast.jpg'
import prod14 from './ProductImages/dark-fantasy-cream-biscuit-choco-creme.jpg'
import prod15 from './ProductImages/kitkat-share-bag-chocolate-covered-wafer.webp'

import img1 from './OtherImages/fruits-and-veggies.jpg'
import img2 from './OtherImages/supermarket.jpg'
import img3 from './OtherImages/about_us.jpg'


// Importing SignupImage
import SignupImage from './OtherImages/Signupimg.jpeg'

// Importing ItemListImages
import AmulCheeseBlock from './ItemListImages/AmulCheeseBlock.jpeg';
import Biscuits from './ItemListImages/Biscuits.jpg';
import Bread from './ItemListImages/bread.webp';
import Dahi from './ItemListImages/dahi.webp';
import Eggs from './ItemListImages/eggs.webp';
import Kelloggs from './ItemListImages/keloggs.jpg';
import Oats from './ItemListImages/Quaker Rolled Oats.jpeg';

export const assets = {
    logo,
    about_us_img,
    dropdown_icon,
    dropup_icon,
    bin_icon,
    menu_icon,
    cross_icon,
    hero_img,
    img2,
    success_icon,
    SignupImage, 

    // ItemList Images
    AmulCheeseBlock,
    Biscuits,
    Bread,
    Dahi,
    Eggs,
    Kelloggs,
    Oats
}

export const homeCategories = [
    { name: 'Dairy and Bread', image: dairyBread },
    { name: 'Fruits and Vegetables', image: fruitsVeg },
    { name: 'Cold Drinks and Juice', image: drinksJuice },
    { name: 'Snacks and Munchies', image: snacksMunchies },
    { name: 'Bakery and Biscuits', image: bakeryBiscuits },
    { name: 'Sauces and Spreads', image: saucesSpreads },
    { name: 'Pharma and Wellness', image: pharmaWellness },
    { name: 'Personal Care', image: personalCare },
    { name: 'Cleaning Essentials', image: cleaningEssentials },
    { name: 'Home and Offices', image: homeOffices },
]

//Dummy Data
export const products = [
    {
        id: 1,
        name: 'Amul Taaza Milk',
        category: 'Dairy, Bread & Eggs',
        price: 28,
        image: prod1,
        description:
            'Amul Taaza fresh toned milk is the excellent quality of milk sourced from Gujarat. It comes in a pouch and can be consumed directly. There is no need to boil as it has virtually zero bacteria.',
    },
    {
        id: 2,
        name: 'Amul Fresh Malai Paneer',
        category: 'Dairy, Bread & Eggs',
        price: 91,
        image: prod2,
        description:
            'Amul Fresh Malai Paneer offers a creamy, rich taste perfect for a variety of dishes. Made from fresh milk, this paneer is soft and smooth, adding a delightful texture to curries, snacks, and more.',
    },
    {
        id: 3,
        name: 'Amul Pure Milk Cheese Cubes',
        category: 'Dairy, Bread & Eggs',
        price: 518.5,
        image: prod3,
        description:
            'The cubic shapes of Amul Processed Cheese Chiplets make it perfect for parties. They are best served with pineapple dices, and to add some zing, you can sprinkle some chaat masala over the cubes.',
    },
    {
        id: 4,
        name: 'Tasties Brown Bread',
        category: 'Dairy, Bread & Eggs',
        price: 45,
        image: prod4,
        description:
            'Tasties presents freshly baked brown bread for your everyday breakfast. Enjoy the bread with your favourite accompaniments. ',
    },
    {
        id: 5,
        name: 'fresho! Farm Eggs, Regular',
        category: 'Dairy, Bread & Eggs',
        price: 82,
        image: prod5,
        description:
            'Eggs are one of the common food items in most of the households. From breakfast to dinner, eggs are indulged in various ways. Poached, boiled, fried; we all have our own favourite choices.',
    },
    {
        id: 6,
        name: 'Shimla Apple',
        category: 'Fruits & Vegetables',
        price: 187,
        image: prod6,
        description: 'Shimla apples, known for their crisp texture and balanced sweet-tart flavour, are a favourite variety. The small-sized apples offer convenience and portion control, making them perfect for a quick snack.',
    },

    {
        id: 7,
        name: 'Mixed Capsicum',
        category: 'Fruits & Vegetables',
        price: 84,
        image: prod7,
        description:
            'Bright and crisp, our organically grown capsicums bring a burst of colour and flavour to your meals. Perfect for salads, stir-fries, or roasting, these vibrant peppers offer a delightful crunch and natural sweetness.',
    },
    {
        id: 8,
        name: 'Potato',
        category: 'Fruits & Vegetables',
        price: 27.07,
        image: prod8,
        description:
            'Potatoes are a versatile staple in cooking, prized for their mild, earthy flavour and smooth texture. They are rich in carbohydrates and contain essential nutrients like potassium, vitamin C, and fibre.',
    },
    {
        id: 9,
        name: 'Sliced Pineapple',
        category: 'Fruits & Vegetables',
        price: 80.16,
        image: prod9,
        description:
            'Fresho offers pineapple slices that are convenient and time-saving. These sliced pineapples can be enjoyed as a snack or added to meals to make them more interesting.',
    },
    {
        id: 10,
        name: 'Curry Leaves',
        category: 'Fruits & Vegetables',
        price: 52.6,
        image: prod10,
        description:
            'Curry leaves are an essential element of Indian cooking style, where numerous traditional and modern recipes are incomplete without curry leaves.',
    },
    {
        id: 11,
        name: "Lay's Potato Chips - India's Masala Magic",
        category: 'Snacks & Munchies',
        price: 30,
        image: prod11,
        description:
            'Binge on these exquisite bites of pure Masala magic! With hints of cumin, coriander, chilli powder, onion, and garlic, Magic Masala is a one-way ticket to a world of exploding flavours.',
    },
    {
        id: 12,
        name: 'Maharashtra Chaat Papdi',
        category: 'Snacks & Munchies',
        price: 80,
        image: prod12,
        description:
            'Freshly blended with traditional Maharashtrian spices and made with local recipes, our Maharashtra Chaat Namkeen Papdi - Crispy comes with a spicy tadka and is naturally processed with the finest wheat flour and local ajwain.',
    },
    {
        id: 13,
        name: 'fresho! Signature Chilli Garlic Butter Toast',
        category: 'Snacks & Munchies',
        price: 85,
        image: prod13,
        description:
            "This flavourful garlic and herbs toast is all you need to make the best of those afternoons and evenings. Beat those evening blues with some chilli cheese toast. Whether it is buns, pav or pizza base, you ought to explore Fresho's range of delicious bakes.",
    },
    {
        id: 14,
        name: 'Sunfeast Dark Fantasy Crème',
        category: 'Snacks & Munchies',
        price: 50,
        image: prod14,
        description:
            "One bite of this choco biscuit and you'd be lost in a world far away from normalcy. Where rivers of creamy chocolates flow free and mountains of dark chocolate stand tall.",
    },
    {
        id: 15,
        name: 'Nestlé KitKat Minis Chocolate Coated Wafer Bar',
        category: 'Snacks & Munchies',
        price: 283.1,
        image: prod15,
        description:
            'Have a Break, Have a KitKat! Share your favourite treats with your favourite people and indulge in the deliciousness of Nestle KitKat Minis! This share bag contains 18 units of KitKat Minis, making it perfect for stocking up or passing around with friends and family.',
    },
]

export const aboutImages = [
    { src: img1, title: "Fresh Product" },
    { src: img2, title: "Shopping Aisle" },
    { src: img3, title: "Store Interior" },
];

export const cartItems = [
    { id: 1, name: 'Amul Taaza Milk', price: 27, quantity: 2, image: prod1 },
    { id: 2, name: 'Aashirvaad Atta', price: 246, quantity: 1, image: prod2 },
    { id: 3, name: 'Parle Poppins Candy', price: 23, quantity: 1, image: prod3 },
];