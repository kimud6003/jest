# 🚀 Jest Method 사용
![img](./imgs/title.png)

[1. Matcher](#matcher)  
[2. Async](#async)  
[3. Mock](#mock)  
[4. Snapshot](#snapshot)  

## Matcher

- toBe() : `expect`에 예상과 결과값이 같은지 판단하는 메소드, 객체 한해서 얕은비교 진행합니다.

```js
test("Tobe method는 object.is로 작동됩니다",()=>{
    expect(1).toBe(1);
  })
```

```js
  test("toBe method는 모든 필드를 재귀적으로 확인X",()=>{
    const obj = {one:1} // 1번주소에 obj {one:1}
    // const objPrime = obj;
    expect(obj).not.toBe({one:1}); // X'주소에 {one:1}
  })
```

- not() : `expect`의 예상값과 Not비교가 가능합니다.

```js
  test("Matcher에서는 not을 통한 비교도 가능합니다", () => {
    expect(2+2).not.toBe(5);
  })
```

- toHaveProperty() : `expect`가 `object`일 경우 `key`, `value` 참조가 가능합니다.

```js
 test("toHaveProperty에서는 객체안에서 참조 가능한 Key,Value가 있는지 확인 가능합니다", () => {
    const obj = {a:true, b:2, c:{D:3} };
    expect(obj).toHaveProperty('a');
    expect(obj).toHaveProperty('b',2);

  })
```

- toHaveLength() : `expect`가 `iterable`한 요소일때 길이를 측정할수있습니다.

```js
  test("toHaveLength Literable한 요소의 길이를 확인할수있습니다.",()=>{
    expect([1,2,3]).toHaveLength(3);
    expect("123").toHaveLength(3);
  })
```

- toEqual(): `expect`가 객체일 경우 toBe와 다르게 모든 필드를 재귀적으로 확인, 그러나 undefined는 고려하지 못합니다.

```js
  test("toEqual Method는 toBe랑 다르게 모든 필드를 재귀적으로 확인합니다",()=>{
    const obj = {one:1}
    obj["two"] = 2;
    expect(obj).toEqual({one:1,two:2});
    expect(obj).toEqual({one:1,two:2,three:undefined});
  })
```

- toStrictEqual() : `expect`가 객체일 경우 `toEqual`과 다르게 Undefiend까지 고려할수 있습니다. 객체 리터럴, 인스턴스는 다르게 판단합니다.

```js
  test("toStrictEqual Method는 toEqual랑 다르게 모든 필드를 재귀적으로 확인, undefined 체크합니다.",()=>{
    const obj = {one:1} // 1번주소에 obj {one:1}
    obj["two"] = 2;
    expect(obj).toStrictEqual({one:1,two:2}); // X'주소에 {one:1}
    expect(obj).not.toStrictEqual({one:1,two:2,three:undefined}); // X'주소에 {one:1}
  })
```

```js
  test("toStrictEqual Method는 객체 리터럴, 인스턴스를 다르게 판단합니다",()=>{
    class orign {
      constructor(key){
        this.key = key;
      }
    }
    const orginal = new orign(1); // new로 생성된 객체는 주소가 다르다.
    const compare = {key:1}; // 객체 리터럴로 생성된 객체는 주소가 같다.

    expect(orginal).not.toStrictEqual(compare);
  })
```

- toBeNull(): `expect`의 결과물이 `NULL`인지 판단합니다

```js
  test("null 비교",()=>{
    const n =null;
    expect(n).toBeNull(); //null 에만 일치
  })
```

- toBeDefined(),toBeUndefined(): `expect`의 결과물이 `undefined`인지/ 아닌지 판단합니다

```js
  test("null, undefined,false 참거짓 비교",()=>{
    const n =null;
    expect(n).toBeDefined(); // 정의된 값에만 일치
    expect(n).not.toBeUndefined(); // tobeDefined와 반대
  })
```

- toBeTruthy(), toBeFalsy(): `expect`의 결과물이 `true` 인지 `false`인지 판단합니다

```js
  test("null, undefined,false 참거짓 비교",()=>{
    const n =null;
    expect(n).not.toBeTruthy(); // true에 일치
    expect(n).toBeFalsy(); // false에 일치
  })
```

- toBeGreaterThan(), toBeGreaterThanOrEqaul() : `expect`의 결과물이 초과 이상인지 판단합니다

```js
  test("숫자를 비교하는 메소드",()=>{
    const value = 4;
    expect(value).toBeGreaterThan(3); //초과
    expect(value).toBeGreaterThanOrEqual(4); //이상
  })
```

- toBeLessThan(), toBeLessThanOrEqual() : `expect`의 결과물이 미만인지 이하인지 판단합니다

```js
  test("숫자를 비교하는 메소드",()=>{
    const value = 4;
    expect(value).toBeLessThan(5); //미만
    expect(value).toBeLessThanOrEqual(4); //이하
  })
```

- toMatch() : `expect`의 결과물이 정규식 문자열을 비교해서 검색 가능합니다

```js
  test("toMatch 정규식과 문자열을 비교해서 검색 가능",()=>{
    expect("team").not.toMatch(/I/);
  })
```

- toContain() : `expect`의 결과물이 iterable한 객체일때 내용물이 없는지 확인합니다

```js
  test("toContain 배열안에 특정 요소가 있는지 확인",()=>{
    expect("team").toContain("t");
    expect([1,2,3]).toContain(1);
  })
```

## Async

- `JS`를 다루다보면 비동기 코드를 마주치게 됩니다.

- 이때 어떻게 해결해야할지 알아보도록 하죠

- 잘못된 경우

  ```js

  //비동기 함수 Get Name
  const getName = (callback) => {
    const name = "Mike";
    setTimeout(() => {
      callback(name);
    }, 1000);
  };

  describe("Asnyc 방식들",()=>{
  test('이렇게 하면 잘못된 방식', () => {
    function callback(name) {
      expect(name).toBe("Mike");
    }
    getName(callback);
  }); 

  ```
  - 기본적으로 Jest는 test함수 마지막에 도착하면 종료를 선언합니다.

- Done(): 을 사용하면 test의 함수의 마지막이 도착하더라도 남은 Callaback 함수가 종료 될때까지 대기하게 됩니다.

```js

  //비동기 함수 Get Name
  const getName = (callback) => {
    const name = "Mike";
    setTimeout(() => {
      callback(name);
    }, 1000);
  };

  test("Done을 사용해서 기본적인 비동기 함수를 해결",(done)=>{
    function callback(name) {
      expect(name).toBe("Mike");
      done();
    }
    getName(callback);
  });

```


- Async함수는 항상 Promise를 반환합니다. 
- 그렇기때문에 `then`에서 `expect`를 작성해주는것도 방법입니다.

```js
test("Async 함수는 Promise를 반환합니다.",()=>{
    async function asyncFunc(){
      return 1;
    }
    asyncFunc().then(res =>
      expect(res).toBe(1)
    );
  })

```

- resolves(), rejects() : pending된 expect 결과물을 분해해주는 메소드합니다
```js

  test("resolve를 통해 Fullfilled 상태의 Promise를 반환합니다.",()=>{
    async function asyncFunc(){
      return 1;
    }

    expect(asyncFunc()).resolves.toBe(1);
  })

  test("reject를 통해 reject상태의 값을 반환합니다",()=>{
    async function asyncFunc(){
      throw new Error("error");
    }

    expect(asyncFunc()).rejects.toThrow("error");
  })

```

- 비동기함수를 awiat를 통해 해결할수있습니다.

```js

  test("await를 통해 promise를 해결 가능합니다.",async()=>{
    async function asyncFunc(){
      return 1;
    }
    expect(await asyncFunc()).toBe(1);
  })
```

## Mock

- mockName(),getMockName() : Mock 함수의 이름을 지어주고 가져올수있습니다.

```js

  test("MockName, getMockName 함수의 이름을 지어주고 가져올수있습니다",()=>{
    const mockFn = jest.fn().mockName("kud");
    expect(mockFn.getMockName()).toBe("kud");
  })

```

- mockReturnValue() : 값을 배출하는 함수를 만듭니다.

```js
  
  test("mockReturnValue를 통해 값을 배출하는 함수를 만듭니다.",()=>{
    const mockFn = jest.fn().mockName("lcs");
    mockFn.mockReturnValue("1");
    // void 특징의 value값을 배출
    expect(mockFn()).toBe("1");

    mockFn.mockReturnValue("2");
    expect(mockFn()).toBe("2");
  })

```

- mockImplemetation() : 원하는 함수를 지정해서 만들수 있습니다.

```js
  test("mockImplemetation을 통해 함수를 지정합니다",()=>{
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
- mock.calls, mock.results : 호출된 함수의 arugment와 결과물을 참조할수있습니다.

```js

  test("mock.calls,mock.results를 사용해서 호출된 argument와 result를 참조합니다",()=>{
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

- toBeCalled(), toBeCalledTimes(), toBeCalledWith() : 통해 함수의 호출이 몇번 되었는지 어떤 인자와 되었는지 알수있습니다.

```js
  test("toBeCalled,toBeCalledTimes,toBeCalledWith 을 통해 함수 호출이 되었는지 판단합니다",()=>{
    const mockFn = jest.fn();
    mockFn("hello");
    expect(mockFn).toBeCalled();
    expect(mockFn).toHaveBeenCalled();

    expect(mockFn).toBeCalledWith("hello");

    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toHaveBeenCalledTimes(1);
  })
```

- spyOn: `spyOn`을 통해 `가짜 함수`가 아닌 `진짜 함수`가 어떻게 호출 되는지 추적가능합니다

```js
  test("spyOn을 통해 가짜 함수가 아닌 진짜 함수가 호출이 어떻게 되었는지 알수있습니다.",()=>{
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

- jset.mock(): `mocking`아 아니면 까다로운 단위 테스트 예를 들면 `유료 API` 호출의 경우는 `module`을 `mocking`해야 할수있습니다.

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
  test("외부 라이브러리에 Mock시켜서 몇번 실행되는지 확인",()=>{
    listUser();
    expect(listMaker).toBeCalledTimes(1);
  })
```

## Snapshot

- 스냅샷 테스팅(snapshot testing)이란 어떤 기능의 예상 결과를 미리 정확히 포착해두고 실제 결과에 비교하는 테스트 기법

- 다시 새로운 스냅샷을 떠서 기존 스냅샷을 교체하는 방식으로 테스트 코드와 함께 스냅샷도 함께 유지보수 가능합니다

- toMatchInlineSnapshot() : 코드의 인라인에 있는 예측값을 참조해서 결과값과 비교, 값이 비어있을시 한번 실행하면 그전에 있던 예측값이 자동으로 삽입 완료된다.

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

- toMatchSnapshot() : __snapshots__ 폴더에 있는 예측값을 참조해서 결과값과 비교, 값이 비어있을시 한번 실행하면 그전에 있던 예측값이 자동으로 삽입 완료된다.

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