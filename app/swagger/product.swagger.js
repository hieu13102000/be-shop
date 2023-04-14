/**
 * @swagger
 * /list-product:
 *   get:
 *     summary: Get product list or can search by name or brand and also can search both at the same time
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           example: 1
 *       - in: query
 *         name: pageSize
 *         description: Number of items per product page
 *         schema:
 *           type: integer
 *           minimum: 10
 *           maximum: 100
 *           example: 20
 *       - in: query
 *         name: name
 *         description: Product name
 *         schema:
 *           type: string
 *           example: "Son Dior Rouge 999 Màu Đỏ Tươi"
 *       - in: query
 *         name: brand
 *         description: Brand name
 *         schema:
 *           type: string
 *           example: "Dior"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: number
 *                       productName:
 *                         type: string
 *                       productPrice:
 *                         type: number
 *                       productImage:
 *                         type: string
 *                       productMadeIn:
 *                         type: string
 *                       productSaleOff:
 *                         type: number
 *                       brandName:
 *                         type: string
 *                       categoryName:
 *                         type: string
 *             example:
 *               data:
 *                 - productId: 5
 *                   productName: "Son Dior Rouge 999 Màu Đỏ Tươi"
 *                   productPrice: 100
 *                   productImage: "https://firebasestorage.googleapis.com/v0/b/webshop-a5ab0.appspot.com/o/add.png?alt=media&token=1cc404b4-4ab2-4bc3-afcd-f3de66dec8f2"
 *                   productMadeIn: "Pháp"
 *                   productSaleOff: 5
 *                   brandName: "Dior"
 *                   categoryName: "son"
 *               currentPage: 1
 *               pageSize: 10
 *               totalItems: 1
 *               totalPages: 1
 *       '500':
 *          description: Error serve
 */


/**
* @swagger
* /detail-product/{id}:
*   get:
*     summary: Get product list
*     tags:
*       - Products
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Get product details by ID
*         schema:
*           type: integer
*           minimum: 1
*     responses:
*       '200':
*         description: Successful response
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       productId:
*                         type: number
*                       productName:
*                         type: string
*                       productPrice:
*                         type: number
*                       productImage:
*                         type: string
*                       productMadeIn:
*                         type: string
*                       productSaleOff:
*                         type: null
*                       brandName:
*                         type: string
*                       categoryName:
*                         type: string
*             example:
*                   productId: 5
*                   productName: "Son Dior Rouge 999 Màu Đỏ Tươi"
*                   productPrice: 100
*                   productImage: "https://firebasestorage.googleapis.com/v0/b/webshop-a5ab0.appspot.com/o/add.png?alt=media&token=1cc404b4-4ab2-4bc3-afcd-f3de66dec8f2"
*                   productMadeIn: "Pháp"
*                   productSaleOff: 5
*                   brandName: "Dior"
*                   categoryName: "son"
*       '401':
*         description: Cannot find Product with id.
*       '500':
*         description: Error serve
*/


/**
* @swagger
* /create-product:
*   post:
*     summary: Create new products
*     tags:
*       - Products
*     security:
*       - BearerAuth: []
*     requestBody:
*       description: Request body for creating a new product
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               price:
*                 type: string
*               image:
*                 type: string
*               madeIn:
*                 type: string
*               categoryId:
*                 type: integer
*               brandId:
*                 type: integer
*           example:
*             name: "Son Dior Rouge 999 Màu Đỏ Tươi"
*             price: "100"
*             image: "https://firebasestorage.googleapis.com/v0/b/webshop-a5ab0.appspot.com/o/add.png?alt=media&token=1cc404b4-4ab2-4bc3-afcd-f3de66dec8f2"
*             madeIn: "Pháp"
*             categoryId: 1
*             brandId: 1
*     responses:
*       '201':
*         description: Product added successfully
*       '401':
*         description: Unauthorized! Access Token was expired!
*       '403':
*         description: No token provided!
*       '500':
*         description: Some error occurred while creating the Product.
*/

/**
* @swagger
* /update-product/{id}:
*   put:
*     summary: Update a product by ID
*     tags:
*       - Products
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID of the product to update
*         schema:
*           type: integer
*           minimum: 1
*     requestBody:
*       description: Request body for updating product
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               price:
*                 type: string
*               image:
*                 type: string
*               madeIn:
*                 type: string
*               categoryId:
*                 type: integer
*               brandId:
*                 type: integer
*           example:
*             name: "Son Dior Rouge 999 Màu Đỏ Tươi"
*             price: "100"
*             image: "https://firebasestorage.googleapis.com/v0/b/webshop-a5ab0.appspot.com/o/add.png?alt=media&token=1cc404b4-4ab2-4bc3-afcd-f3de66dec8f2"
*             madeIn: "Pháp"
*             categoryId: 1
*             brandId: 1
*     responses:
*       '200':
*         description: Product updated successfully
*       '401':
*         description: Unauthorized! Access Token was expired!
*       '403':
*         description: No token provided!
*       '404':
*         description: Product not found
*       '500':
*         description: Some error occurred while updating the Product.
*/


/**
* @swagger
* /delete-product/{id}:
*   delete:
*     summary: Delete a product by ID
*     tags:
*       - Products
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID of the product to delete
*         schema:
*           type: integer
*           minimum: 1
*     responses:
*       '200':
*         description: Product was deleted successfully!
*       '401':
*         description: Unauthorized! Access Token was expired!
*       '403':
*         description: No token provided!
*       '404':
*         description: Product not found
*       '500':
*         description: Some error occurred while updating the Product.
*/

/**
* @swagger
* /delete-products:
*   delete:
*     summary: Delete multiple products at once
*     tags:
*       - Products
*     security:
*       - BearerAuth: []
*     requestBody:
*       description: Request body for remove array of product ids
*       required: true
*       content:
*         application/json:
*           schema:
  *               productIds:
  *                 type: array
  *                 items:
  *                   type: number
*           example:
*              productIds: [1,2,3]
*     responses:
*       '200':
*         description: Products were deleted successfully!y
*       '401':
*         description: Unauthorized! Access Token was expired!
*       '403':
*         description: No token provided!
*       '404':
*         description: Product not found
*       '500':
*         description: Some error occurred while updating the Product.
*/
