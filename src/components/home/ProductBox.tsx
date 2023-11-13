import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Product, User } from "../../@types/product";
import ProductDescription from "./ProductDescription";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../theme/sizes";
import { users as initialUsers } from "../../@types/users";
import { addToCart, removeFromCart } from "../../api/productAPI";

type ProductBoxProps = {
  product: Product;
};

const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState(initialUsers);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddToShoppingPanel = (updatedUser: User) => {
    console.log("Original Users:", users);

    // Find the index of the user in the array
    const userIndex = users.findIndex((user) => user.id === updatedUser.id);
    console.log("User Index:", userIndex);

    // If the user is found in the array
    if (userIndex !== -1) {
      // Create a new array with the updated user at the found index
      const updatedUsers = [...users];
      updatedUsers[userIndex] = updatedUser;
      console.log("Updated Users:", updatedUsers);

      // Update the state with the new array
      setUsers(updatedUsers);
      console.log("Updated State:", updatedUsers);
      // You might want to log the shoppingCart here as well
    } else {
      console.log("User not found in the array.");
    }

    toggleModal(); // Close the modal after updating
  };

  return (
    <TouchableOpacity
      style={styles.cardStyle}
      onPress={toggleModal}
      activeOpacity={0.8}
    >
      <View style={styles.productCard}>
        <View style={styles.cardImageContainer}>
          <Image source={{ uri: product.images[0] }} style={styles.cardImage} />
        </View>
        <View style={styles.rowBox}>
          <View style={styles.cardDetails}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Icon name="heart-o" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal for displaying more details */}
      <Modal
        style={styles.modalC}
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
      >
        <ProductDescription
          product={product}
          onClose={toggleModal}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    // marginBottom: 10,
  },
  cardStyle: {
    width: "50%",
  },
  modalC: {
    margin: 0,
    width: "100%",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 3, // Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    margin: 10,
    overflow: "hidden",
  },
  cardImageContainer: {
    height: 130,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  cardDetails: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: colors.breakcolor,
  },
});

export default ProductBox;
