# WEB API

## Installation

```bash
    npm install
```

or

```bash
    yarn add
```

## Config enviroment variables

- Create .env file in the root directory

```bash
    PORT = your_port
    DATABASE_URL = your_database_url
    SECRET_ACCESS_TOKEN = your_access_token
    SECRET_REFRESH_TOKEN = your_refresh_token
```

- Generate token by command

```
    node
    require('crypto').randomBytes(64).toString('hex')
```

## Development mode

```bash
    npm run dev
```

or

```bash
    yarn dev
```

## Build mode

```bash
    npm start
```

or

```bash
    yarn start
```

### Rules

# Sử dụng camelCase cho biến, hàm

# Sử dụng UPPERCASE cho constant, enum

# Sử dụng PascalCase cho class, interface, type, trước đuôi file sẽ thêm tiền tố chức năng (tùy 1 vài trường hợp)

```
    Auth.route.ts
    User.model.ts
    Product.controller.ts
```

# File Interface, Enum phải có chữ cái đầu ở trước (trường hợp này không cần tiền tố trước đuôi file)

```
    IUser.ts
    EProduct.ts
```

# Sử dụng '' cho string, không sử dụng ""

```
    let string = 'This is a string' //true
    let anotherString = "This is a string" //false
```

# Bắt buộc ; cuối cùng

```
    let firstNumber = 10; //true
    let secondNumber = 20 //false
```

# Bắt buộc có kiểu trả về

```
    function sum(): number {} //true
    function min() {} //false
```

# Không được sử dụng any

```
    let a: any = 10; //false
    let b: number = 20; //true
```

# Không được gán nhiều biến check null

```
    let object = a?!.b.!!c;  //false
    let anotherObject = !a.b?.c; //true
```

# Sử dụng chính xác kiểu dữ liệu

```
    let bool: Boolean = false; // false
    let anotherBool: boolean = true //true
```
