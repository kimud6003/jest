# ๐ Jest Method ์ฌ์ฉ
![img](./imgs/title.png)

[1. Matcher](#matcher)  
[2. Async](#async)  
[3. Mock](#mock)  
[4. Snapshot](#snapshot)  

## Matcher

- toBe() : `expect`์ ์์๊ณผ ๊ฒฐ๊ณผ๊ฐ์ด ๊ฐ์์ง ํ๋จํ๋ ๋ฉ์๋, ๊ฐ์ฒด ํํด์ ์์๋น๊ต ์งํํฉ๋๋ค.

```js
test("Tobe method๋ object.is๋ก ์๋๋ฉ๋๋ค",()=>{
    expect(1).toBe(1);
  })
```

```js
  test("toBe method๋ ๋ชจ๋  ํ๋๋ฅผ ์ฌ๊ท์ ์ผ๋ก ํ์ธX",()=>{
    const obj = {one:1} // 1๋ฒ์ฃผ์์ obj {one:1}
    // const objPrime = obj;
    expect(obj).not.toBe({one:1}); // X'์ฃผ์์ {one:1}
  })
```

- not() : `expect`์ ์์๊ฐ๊ณผ Not๋น๊ต๊ฐ ๊ฐ๋ฅํฉ๋๋ค.

```js
  test("Matcher์์๋ not์ ํตํ ๋น๊ต๋ ๊ฐ๋ฅํฉ๋๋ค", () => {
    expect(2+2).not.toBe(5);
  })
```

- toHaveProperty() : `expect`๊ฐ `object`์ผ ๊ฒฝ์ฐ `key`, `value` ์ฐธ์กฐ๊ฐ ๊ฐ๋ฅํฉ๋๋ค.

```js
 test("toHaveProperty์์๋ ๊ฐ์ฒด์์์ ์ฐธ์กฐ ๊ฐ๋ฅํ Key,Value๊ฐ ์๋์ง ํ์ธ ๊ฐ๋ฅํฉ๋๋ค", () => {
    const obj = {a:true, b:2, c:{D:3} };
    expect(obj).toHaveProperty('a');
    expect(obj).toHaveProperty('b',2);

  })
```

- toHaveLength() : `expect`๊ฐ `iterable`ํ ์์์ผ๋ ๊ธธ์ด๋ฅผ ์ธก์ ํ ์์์ต๋๋ค.

```js
  test("toHaveLength Literableํ ์์์ ๊ธธ์ด๋ฅผ ํ์ธํ ์์์ต๋๋ค.",()=>{
    expect([1,2,3]).toHaveLength(3);
    expect("123").toHaveLength(3);
  })
```

- toEqual(): `expect`๊ฐ ๊ฐ์ฒด์ผ ๊ฒฝ์ฐ toBe์ ๋ค๋ฅด๊ฒ ๋ชจ๋  ํ๋๋ฅผ ์ฌ๊ท์ ์ผ๋ก ํ์ธ, ๊ทธ๋ฌ๋ undefined๋ ๊ณ ๋ คํ์ง ๋ชปํฉ๋๋ค.

```js
  test("toEqual Method๋ toBe๋ ๋ค๋ฅด๊ฒ ๋ชจ๋  ํ๋๋ฅผ ์ฌ๊ท์ ์ผ๋ก ํ์ธํฉ๋๋ค",()=>{
    const obj = {one:1}
    obj["two"] = 2;
    expect(obj).toEqual({one:1,two:2});
    expect(obj).toEqual({one:1,two:2,three:undefined});
  })
```

- toStrictEqual() : `expect`๊ฐ ๊ฐ์ฒด์ผ ๊ฒฝ์ฐ `toEqual`๊ณผ ๋ค๋ฅด๊ฒ Undefiend๊น์ง ๊ณ ๋ คํ ์ ์์ต๋๋ค. ๊ฐ์ฒด ๋ฆฌํฐ๋ด, ์ธ์คํด์ค๋ ๋ค๋ฅด๊ฒ ํ๋จํฉ๋๋ค.

```js
  test("toStrictEqual Method๋ toEqual๋ ๋ค๋ฅด๊ฒ ๋ชจ๋  ํ๋๋ฅผ ์ฌ๊ท์ ์ผ๋ก ํ์ธ, undefined ์ฒดํฌํฉ๋๋ค.",()=>{
    const obj = {one:1} // 1๋ฒ์ฃผ์์ obj {one:1}
    obj["two"] = 2;
    expect(obj).toStrictEqual({one:1,two:2}); // X'์ฃผ์์ {one:1}
    expect(obj).not.toStrictEqual({one:1,two:2,three:undefined}); // X'์ฃผ์์ {one:1}
  })
```

```js
  test("toStrictEqual Method๋ ๊ฐ์ฒด ๋ฆฌํฐ๋ด, ์ธ์คํด์ค๋ฅผ ๋ค๋ฅด๊ฒ ํ๋จํฉ๋๋ค",()=>{
    class orign {
      constructor(key){
        this.key = key;
      }
    }
    const orginal = new orign(1); // new๋ก ์์ฑ๋ ๊ฐ์ฒด๋ ์ฃผ์๊ฐ ๋ค๋ฅด๋ค.
    const compare = {key:1}; // ๊ฐ์ฒด ๋ฆฌํฐ๋ด๋ก ์์ฑ๋ ๊ฐ์ฒด๋ ์ฃผ์๊ฐ ๊ฐ๋ค.

    expect(orginal).not.toStrictEqual(compare);
  })
```

- toBeNull(): `expect`์ ๊ฒฐ๊ณผ๋ฌผ์ด `NULL`์ธ์ง ํ๋จํฉ๋๋ค

```js
  test("null ๋น๊ต",()=>{
    const n =null;
    expect(n).toBeNull(); //null ์๋ง ์ผ์น
  })
```

- toBeDefined(),toBeUndefined(): `expect`์ ๊ฒฐ๊ณผ๋ฌผ์ด `undefined`์ธ์ง/ ์๋์ง ํ๋จํฉ๋๋ค

```js
  test("null, undefined,false ์ฐธ๊ฑฐ์ง ๋น๊ต",()=>{
    const n =null;
    expect(n).toBeDefined(); // ์ ์๋ ๊ฐ์๋ง ์ผ์น
    expect(n).not.toBeUndefined(); // tobeDefined์ ๋ฐ๋
  })
```

- toBeTruthy(), toBeFalsy(): `expect`์ ๊ฒฐ๊ณผ๋ฌผ์ด `true` ์ธ์ง `false`์ธ์ง ํ๋จํฉ๋๋ค

```js
  test("null, undefined,false ์ฐธ๊ฑฐ์ง ๋น๊ต",()=>{
    const n =null;
    expect(n).not.toBeTruthy(); // true์ ์ผ์น
    expect(n).toBeFalsy(); // false์ ์ผ์น
  })
```

- toBeGreaterThan(), toBeGreaterThanOrEqaul() : `expect`์ ๊ฒฐ๊ณผ๋ฌผ์ด ์ด๊ณผ ์ด์์ธ์ง ํ๋จํฉ๋๋ค

```js
  test("์ซ์๋ฅผ ๋น๊ตํ๋ ๋ฉ์๋",()=>{
    const value = 4;
    expect(value).toBeGreaterThan(3); //์ด๊ณผ
    expect(value).toBeGreaterThanOrEqual(4); //์ด์
  })
```

- toBeLessThan(), toBeLessThanOrEqual() : `expect`์ ๊ฒฐ๊ณผ๋ฌผ์ด ๋ฏธ๋ง์ธ์ง ์ดํ์ธ์ง ํ๋จํฉ๋๋ค

```js
  test("์ซ์๋ฅผ ๋น๊ตํ๋ ๋ฉ์๋",()=>{
    const value = 4;
    expect(value).toBeLessThan(5); //๋ฏธ๋ง
    expect(value).toBeLessThanOrEqual(4); //์ดํ
  })
```

- toMatch() : `expect`์ ๊ฒฐ๊ณผ๋ฌผ์ด ์ ๊ท์ ๋ฌธ์์ด์ ๋น๊ตํด์ ๊ฒ์ ๊ฐ๋ฅํฉ๋๋ค

```js
  test("toMatch ์ ๊ท์๊ณผ ๋ฌธ์์ด์ ๋น๊ตํด์ ๊ฒ์ ๊ฐ๋ฅ",()=>{
    expect("team").not.toMatch(/I/);
  })
```

- toContain() : `expect`์ ๊ฒฐ๊ณผ๋ฌผ์ด iterableํ ๊ฐ์ฒด์ผ๋ ๋ด์ฉ๋ฌผ์ด ์๋์ง ํ์ธํฉ๋๋ค

```js
  test("toContain ๋ฐฐ์ด์์ ํน์  ์์๊ฐ ์๋์ง ํ์ธ",()=>{
    expect("team").toContain("t");
    expect([1,2,3]).toContain(1);
  })
```

## Async

- `JS`๋ฅผ ๋ค๋ฃจ๋ค๋ณด๋ฉด ๋น๋๊ธฐ ์ฝ๋๋ฅผ ๋ง์ฃผ์น๊ฒ ๋ฉ๋๋ค.

- ์ด๋ ์ด๋ป๊ฒ ํด๊ฒฐํด์ผํ ์ง ์์๋ณด๋๋ก ํ์ฃ 

- ์๋ชป๋ ๊ฒฝ์ฐ

  ```js

  //๋น๋๊ธฐ ํจ์ Get Name
  const getName = (callback) => {
    const name = "Mike";
    setTimeout(() => {
      callback(name);
    }, 1000);
  };

  describe("Asnyc ๋ฐฉ์๋ค",()=>{
  test('์ด๋ ๊ฒ ํ๋ฉด ์๋ชป๋ ๋ฐฉ์', () => {
    function callback(name) {
      expect(name).toBe("Mike");
    }
    getName(callback);
  }); 

  ```
  - ๊ธฐ๋ณธ์ ์ผ๋ก Jest๋ testํจ์ ๋ง์ง๋ง์ ๋์ฐฉํ๋ฉด ์ข๋ฃ๋ฅผ ์ ์ธํฉ๋๋ค.

- Done(): ์ ์ฌ์ฉํ๋ฉด test์ ํจ์์ ๋ง์ง๋ง์ด ๋์ฐฉํ๋๋ผ๋ ๋จ์ Callaback ํจ์๊ฐ ์ข๋ฃ ๋ ๋๊น์ง ๋๊ธฐํ๊ฒ ๋ฉ๋๋ค.

```js

  //๋น๋๊ธฐ ํจ์ Get Name
  const getName = (callback) => {
    const name = "Mike";
    setTimeout(() => {
      callback(name);
    }, 1000);
  };

  test("Done์ ์ฌ์ฉํด์ ๊ธฐ๋ณธ์ ์ธ ๋น๋๊ธฐ ํจ์๋ฅผ ํด๊ฒฐ",(done)=>{
    function callback(name) {
      expect(name).toBe("Mike");
      done();
    }
    getName(callback);
  });

```


- Asyncํจ์๋ ํญ์ Promise๋ฅผ ๋ฐํํฉ๋๋ค. 
- ๊ทธ๋ ๊ธฐ๋๋ฌธ์ `then`์์ `expect`๋ฅผ ์์ฑํด์ฃผ๋๊ฒ๋ ๋ฐฉ๋ฒ์๋๋ค.

```js
test("Async ํจ์๋ Promise๋ฅผ ๋ฐํํฉ๋๋ค.",()=>{
    async function asyncFunc(){
      return 1;
    }
    asyncFunc().then(res =>
      expect(res).toBe(1)
    );
  })

```

- resolves(), rejects() : pending๋ expect ๊ฒฐ๊ณผ๋ฌผ์ ๋ถํดํด์ฃผ๋ ๋ฉ์๋ํฉ๋๋ค
```js

  test("resolve๋ฅผ ํตํด Fullfilled ์ํ์ Promise๋ฅผ ๋ฐํํฉ๋๋ค.",()=>{
    async function asyncFunc(){
      return 1;
    }

    expect(asyncFunc()).resolves.toBe(1);
  })

  test("reject๋ฅผ ํตํด reject์ํ์ ๊ฐ์ ๋ฐํํฉ๋๋ค",()=>{
    async function asyncFunc(){
      throw new Error("error");
    }

    expect(asyncFunc()).rejects.toThrow("error");
  })

```

- ๋น๋๊ธฐํจ์๋ฅผ awiat๋ฅผ ํตํด ํด๊ฒฐํ ์์์ต๋๋ค.

```js

  test("await๋ฅผ ํตํด promise๋ฅผ ํด๊ฒฐ ๊ฐ๋ฅํฉ๋๋ค.",async()=>{
    async function asyncFunc(){
      return 1;
    }
    expect(await asyncFunc()).toBe(1);
  })
```

## Mock

- mockName(),getMockName() : Mock ํจ์์ ์ด๋ฆ์ ์ง์ด์ฃผ๊ณ  ๊ฐ์ ธ์ฌ์์์ต๋๋ค.

```js

  test("MockName, getMockName ํจ์์ ์ด๋ฆ์ ์ง์ด์ฃผ๊ณ  ๊ฐ์ ธ์ฌ์์์ต๋๋ค",()=>{
    const mockFn = jest.fn().mockName("kud");
    expect(mockFn.getMockName()).toBe("kud");
  })

```

- mockReturnValue() : ๊ฐ์ ๋ฐฐ์ถํ๋ ํจ์๋ฅผ ๋ง๋ญ๋๋ค.

```js
  
  test("mockReturnValue๋ฅผ ํตํด ๊ฐ์ ๋ฐฐ์ถํ๋ ํจ์๋ฅผ ๋ง๋ญ๋๋ค.",()=>{
    const mockFn = jest.fn().mockName("lcs");
    mockFn.mockReturnValue("1");
    // void ํน์ง์ value๊ฐ์ ๋ฐฐ์ถ
    expect(mockFn()).toBe("1");

    mockFn.mockReturnValue("2");
    expect(mockFn()).toBe("2");
  })

```

- mockImplemetation() : ์ํ๋ ํจ์๋ฅผ ์ง์ ํด์ ๋ง๋ค์ ์์ต๋๋ค.

```js
  test("mockImplemetation์ ํตํด ํจ์๋ฅผ ์ง์ ํฉ๋๋ค",()=>{
    const mockFn = jest.fn().mockName("sej");
    mockFn.mockImplementation(()=>{
      return "1";
    })
    expect(mockFn()).toBe("1");

    mockFn.mockImplementation(()=>{
      return "2";
    })
    expect(mockFn()).toBe("2");
  })

```
- mock.calls, mock.results : ํธ์ถ๋ ํจ์์ arugment์ ๊ฒฐ๊ณผ๋ฌผ์ ์ฐธ์กฐํ ์์์ต๋๋ค.

```js

  test("mock.calls,mock.results๋ฅผ ์ฌ์ฉํด์ ํธ์ถ๋ argument์ result๋ฅผ ์ฐธ์กฐํฉ๋๋ค",()=>{
    const mockFn = jest.fn();
    
    mockFn.mockImplementation((number)=>{
      if(number%2===0)return "even";
      else return "odd";
    })

    mockFn(2);
    mockFn(8);

    console.log(mockFn.mock.calls);
    console.log(mockFn.mock.results);
  })
```

- toBeCalled(), toBeCalledTimes(), toBeCalledWith() : ํตํด ํจ์์ ํธ์ถ์ด ๋ช๋ฒ ๋์๋์ง ์ด๋ค ์ธ์์ ๋์๋์ง ์์์์ต๋๋ค.

```js
  test("toBeCalled,toBeCalledTimes,toBeCalledWith ์ ํตํด ํจ์ ํธ์ถ์ด ๋์๋์ง ํ๋จํฉ๋๋ค",()=>{
    const mockFn = jest.fn();
    mockFn("hello");
    expect(mockFn).toBeCalled();
    expect(mockFn).toHaveBeenCalled();

    expect(mockFn).toBeCalledWith("hello");

    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toHaveBeenCalledTimes(1);
  })
```

- spyOn: `spyOn`์ ํตํด `๊ฐ์ง ํจ์`๊ฐ ์๋ `์ง์ง ํจ์`๊ฐ ์ด๋ป๊ฒ ํธ์ถ ๋๋์ง ์ถ์ ๊ฐ๋ฅํฉ๋๋ค

```js
  test("spyOn์ ํตํด ๊ฐ์ง ํจ์๊ฐ ์๋ ์ง์ง ํจ์๊ฐ ํธ์ถ์ด ์ด๋ป๊ฒ ๋์๋์ง ์์์์ต๋๋ค.",()=>{
    const sum ={
      add:(a,b)=>a+b
    };

    const spyfn = jest.spyOn(sum,"add");
    const results = sum.add(2,3);

    expect(spyfn).toBeCalled();
    expect(spyfn).toBeCalledWith(2,3);
    expect(results).toBe(5);
  })
```

- jset.mock(): `mocking`์ ์๋๋ฉด ๊น๋ค๋ก์ด ๋จ์ ํ์คํธ ์๋ฅผ ๋ค๋ฉด `์ ๋ฃ API` ํธ์ถ์ ๊ฒฝ์ฐ๋ `module`์ `mocking`ํด์ผ ํ ์์์ต๋๋ค.

- listMaker.js
```js
function listMaker(index= 3){
  let list =[];

  for(let i=1;i<=index;i++){
    list.push(i);
  }
  return list
}
export default listMaker;
```

- listUser.js
```js
import listMaker from "./listMaker";

function listUser(){
  return listMaker(5);
}

export default listUser;
```

- mocking.test.js
```js
import listUser from "./listUser"
import listMaker from "./listMaker"

jest.mock("./listMaker");
  test("์ธ๋ถ ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ Mock์์ผ์ ๋ช๋ฒ ์คํ๋๋์ง ํ์ธ",()=>{
    listUser();
    expect(listMaker).toBeCalledTimes(1);
  })
```

## Snapshot

- ์ค๋์ท ํ์คํ(snapshot testing)์ด๋ ์ด๋ค ๊ธฐ๋ฅ์ ์์ ๊ฒฐ๊ณผ๋ฅผ ๋ฏธ๋ฆฌ ์ ํํ ํฌ์ฐฉํด๋๊ณ  ์ค์  ๊ฒฐ๊ณผ์ ๋น๊ตํ๋ ํ์คํธ ๊ธฐ๋ฒ

- ๋ค์ ์๋ก์ด ์ค๋์ท์ ๋ ์ ๊ธฐ์กด ์ค๋์ท์ ๊ต์ฒดํ๋ ๋ฐฉ์์ผ๋ก ํ์คํธ ์ฝ๋์ ํจ๊ป ์ค๋์ท๋ ํจ๊ป ์ ์ง๋ณด์ ๊ฐ๋ฅํฉ๋๋ค

- toMatchInlineSnapshot() : ์ฝ๋์ ์ธ๋ผ์ธ์ ์๋ ์์ธก๊ฐ์ ์ฐธ์กฐํด์ ๊ฒฐ๊ณผ๊ฐ๊ณผ ๋น๊ต, ๊ฐ์ด ๋น์ด์์์ ํ๋ฒ ์คํํ๋ฉด ๊ทธ์ ์ ์๋ ์์ธก๊ฐ์ด ์๋์ผ๋ก ์ฝ์ ์๋ฃ๋๋ค.

```js
function listMaker(index= 3){
  let list =[];

  for(let i=1;i<=index;i++){
    list.push(i);
  }
  return list
}
export default listMaker;
```

```js
import listMaker from "./listMaker";
// Before Run
  test("listMaker", () => {
    expect(listMaker(4)).toMatchInlineSnapshot();
  });

// After Run
  test("listMaker", () => {
    expect(listMaker(4)).toMatchInlineSnapshot(`[1,2,3,4]`);
  });
```

- toMatchSnapshot() : __snapshots__ ํด๋์ ์๋ ์์ธก๊ฐ์ ์ฐธ์กฐํด์ ๊ฒฐ๊ณผ๊ฐ๊ณผ ๋น๊ต, ๊ฐ์ด ๋น์ด์์์ ํ๋ฒ ์คํํ๋ฉด ๊ทธ์ ์ ์๋ ์์ธก๊ฐ์ด ์๋์ผ๋ก ์ฝ์ ์๋ฃ๋๋ค.

```js
  test("listMaker", () => {
    expect(listMaker()).toMatchSnapshot();
  });
```


```js
exports[`snapshot Test listMaker 1`] = `
[
  1,
  2,
  3,
]
`;

```