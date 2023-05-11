function validateWishlistData(wishlistData) {
    // Check if the wishlistData object has the required properties
    if (
      !wishlistData ||
      typeof wishlistData.name !== 'string' ||
      !Array.isArray(wishlistData.items) ||
      wishlistData.items.some(
        (item) =>
          typeof item.name !== 'string' ||
          typeof item.priority !== 'number' ||
          typeof item.quantity !== 'number' ||
          typeof item.price !== 'number' ||
          typeof item.link !== 'string'
      )
    ) {
      throw new Error('Invalid wishlist data format.');
    }
}

function validateItem(item){
    if(
        !item ||
        typeof item.name !== 'string' ||
        typeof item.priority !== 'number' ||
        typeof item.quantity !== 'number' ||
        typeof item.price !== 'number' ||
        typeof item.link !== 'string'
    ){
        throw new Error('Invalid item data format.');
    }
}

module.exports = {
    validateWishlistData,
    validateItem
} 