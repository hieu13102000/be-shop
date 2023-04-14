
/**
  * @swagger
  * /api/auth/signup:
  *   post:
  *     summary: Register new member
  *     tags:
  *       - Auth
  *     requestBody:
  *       description: Api creates user accounts. If the role field is not submitted, defaults to user. If there is a role field, it will receive a string data array containing the permissions
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               username:
  *                 type: string
  *               email:
  *                 type: string
  *               password:
  *                 type: string
  *               roles:
  *                 type: array
  *                 items:
  *                   type: string
  *           example:
  *             username: userExample
  *             email: userExample
  *             password: example12345678
  *             roles: ["user","admin","superAdmin"]
  *     responses:
  *       '201':
  *         description: User was registered successfully!
  *       '400':
  *         description: Failed! Username is already in use!
  *       '409':
  *         description: Failed! Email is already in use!
  */

/**
* @swagger
* /api/auth/signin:
*   post:
*     summary: Log in to your account
*     tags:
*       - Auth
*     requestBody:
*       description: Please enter username and password
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*               password:
*                 type: string
*           example:
*             username: userExample
*             password: example12345678
*     responses:
*       '200':
*         description: User logged in successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 userId:
*                   type: integer
*                 username:
*                   type: string
*                 email:
*                   type: string
*                 roles:
*                   type: array
*                   items:
*                     type: string
*                 accessToken:
*                   type: string
*                 refreshToken:
*                   type: string
*               example:
*                 userId: 1
*                 username: userExample,
*                 email: userExample@gmail.com,
*                 roles: ["user", "admin"]
*                 accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxMzczMTYxLCJleHAiOjE2ODEzNzY3NjF9.mWAMpCJDE4lel2-d9YZ5iIJEsJBNpmdrdBv8hVdT53M"
*                 refreshToken: "a7c1c8a3-d725-4dfb-a31a-14bc8d63f39c"
*       '401':
*         description: Invalid Password!
*       '404':
*         description: User Not found.
*/



/**
 * @swagger
 * /api/auth/refreshtoken:
 *   post:
 *     summary: Request new tokens
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *                 refreshToken: "32496f84-3652-4994-b0ff-340818f58f98"
 *     responses:
 *       '200':
 *         description: Refresh token successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       '403':
 *         description: Refresh token was expired. Please make a new signin request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "The token is expired. Please login again"
 */