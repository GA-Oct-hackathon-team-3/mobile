// import React, { useState } from "react";
// import { View, Image } from "react-native";

// const AsyncImage = (props) => {
//   const { source, loading, setLoading } = props;
//   const [loaded, setLoaded] = useState(false);

//   const onLoad = () => {
//     setLoading(true);
//   };

//   return (
//     <View>
//       <Image source={source} resizeMode={"contain"} onLoad={onLoad} />
//       {!loaded && (
//         <View
//           style={{
//             backgroundColor: placeholderColor,
//           }}
//         />
//       )}
//     </View>
//   );
// };

// export default AsyncImage;
