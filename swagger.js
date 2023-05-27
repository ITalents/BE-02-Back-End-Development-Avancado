const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = [
  "./src/routes/Auth/authRoutes.ts",
  "./src/routes/Cart/cartRoutes.ts",
  "./src/routes/Category/categoryRoutes.ts",
  "./src/routes/Order/orderRoutes.ts",
  "./src/routes/Product/productRoutes.ts",
  "./src/routes/User/userRoutes.ts",
];

swaggerAutogen(outputFile, endpointsFiles);
