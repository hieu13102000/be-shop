/**
 * @swagger
 *   /upload-image:
 *     post:
 *       summary: Upload Image
 *       tags:
 *         - Upload
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 fileImage:
 *                   type: string
 *                   format: binary
 *                   example: <binary file content>
 *               required:
 *                 - fileImage
 *       responses:
 *         '200':
 *           description: Images uploaded successfully!
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   url:
 *                     type: string
 *                 example:
 *                    message: Images uploaded successfully!,
 *                    url: https://storage.googleapis.com/webshop-a5ab0.appspot.com/images/file.originalname?GoogleAccessId=firebase-adminsdk-uiqb8%40webshop-a5ab0.iam.gserviceaccount.com&Expires=16446992400&Signature=ENMbZk5A08VfdBkxnTTikbY%2FGFfVKeDoWS6iZTEIai%2BV3EK2ZjLQMgIl6h0efDyS62N%2FLKTyyc%2FxO%2FMplh4DzgWjEu%2B7jydCa%2ByV61CD7gXiR0LiQI1PVJuvxO42jSCgz1LU5bMCSi8p9mo1cH9yr3jtFRxXqg17HBCDSEGDqePMt3s867k2RC79B5uWhpoVQ4CeJ9L0JWklw4015NMc3t1dvijVo15I2qQmucWRkked71eBEnau8RFwFPBorsuepvfL8TBxKDvJO5cQie68I2x9cvcAunVoLHRvSvh4FD3JMZL%2FUoVT0VcpWw5Rps1SdKBygm1RKpDwMibml4TNDA%3D%3D
 *         '400':
 *           description: Malformed image (jpeg or jpg or png )
 *         '401':
 *           description: Unauthorized! Access Token was expired!
 *         '403':
 *           description: No token provided!
 *         '500':
 *           description: Server error
 */

/**
 * @swagger
 *   /upload-video:
 *     post:
 *       summary: Upload video
 *       tags:
 *         - Upload
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 fileVideo:
 *                   type: string
 *                   format: binary
 *                   example: <binary file content>
 *               required:
 *                 - fileVideo
 *       responses:
 *         '200':
 *           description: Videos uploaded successfully!
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   url:
 *                     type: string
 *                 example:
 *                    message: Videos uploaded successfully!,
 *                    url: https://storage.googleapis.com/webshop-a5ab0.appspot.com/videos/file.originalname?GoogleAccessId=firebase-adminsdk-uiqb8%40webshop-a5ab0.iam.gserviceaccount.com&Expires=16446992400&Signature=Wbzz8A9K2G0aNdt1qycgKOyb3IDKU9cUQow1ZKeXPlNhWCc8S%2BzXduKDad3mCIJZzha4BmCnuX02ywcqRhZhBmWACXzoHwenxLxxmaEI0k0lJvkhH4T4yehp1%2Fcwdsp2u9mPXh2TMzozY%2BiuS5Jxt5O1N8zV4SKHufn683lC3MCygQFDyNOvZ76AViqYQzvWi7A4Dlrh0OiBnbWEbwjIrKDKZ%2BaytOHjkF8iDeASkNUJEO8Gu5FBXn%2FL8iAGDspiokQPgLR25ejzYhzB9J%2FC0AMIcLh7ShlRJztD4EsHSEy7GZZ6hSW9626%2FMy8xx%2BsQeo9NOh350ZmNMY3d14VTAQ%3D%3D
 *         '400':
 *           description: Malformed video (mp4 or mov or avi )"
 *         '401':
 *           description: Unauthorized! Access Token was expired!
 *         '403':
 *           description: No token provided!
 *         '500':
 *           description: Server error
 */