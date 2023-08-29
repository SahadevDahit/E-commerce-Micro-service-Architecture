/* The code is defining an array called `publicPaths` and exporting it as a module. The array contains
regular expressions that match certain paths in a web application that do not require authentication
or authorization. These paths include `/users/`, `/products/`, `/feedbackAndReports/`, and
`/shopping/`, as well as `/products/v1/get/` and `/users/v1/login`. */
export const publicPaths = [];
publicPaths.push(/^\/(users|products|feedbackAndReports|shopping)\/$/);
publicPaths.push(/^\/products\/v1(\/all(\/\w+)?)?$/);
publicPaths.push(/^\/users\/v1\/(login)?$/)



/* The code is defining an array called `adminAccessPaths` and exporting it as a module. The array
contains regular expressions that match certain paths in a web application that require admin access
or authorization. These paths include `/products/v1/` and any sub-paths, as well as
`/products/v1/brands`, `/products/v1/colors`, `/products/v1/category`, `/products/v1/coupons`,
`/shopping/v1/brands`, `/shopping/v1/colors`, `/shopping/v1/category`, and `/shopping/v1/coupons`. */
export const sellerAccessPaths = [];
sellerAccessPaths.push(/products\/v1\/(brands|colors|category|coupons)/);
sellerAccessPaths.push(/^\/shopping\/v1\/orders\/sales\/stats\/seller$/)

export const customerAccessPaths = [];
customerAccessPaths.push(/^\/shopping\/v1\/carts(.*)$/);