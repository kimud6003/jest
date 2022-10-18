import {describe, test, expect} from '@jest/globals';

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
  }); // 기본적으로 Jest는 test함수 마지막에 도착하면 종료를 선언한다.

  test("Done을 사용해서 기본적인 비동기 함수를 해결",(done)=>{
    function callback(name) {
      expect(name).toBe("Mike");
      done();
    }
    getName(callback);
  });

  test("Async 함수는 Promise를 반환한다.",()=>{
    async function asyncFunc(){
      return 1;
    }
    asyncFunc().then(res =>
      expect(res).toBe(1)
    );
  })

  test("resolve를 통해 Fullfilled 상태의 Promise를 반환한다.",()=>{
    async function asyncFunc(){
      return 1;
    }

    expect(asyncFunc()).resolves.toBe(1);
  })

  test("reject 메소드를 통해 reject상태의 값을 반환",()=>{
    async function asyncFuncError(){
      throw new Error("error");
    }

    expect(asyncFuncError()).rejects.toThrow("error");
  })

  test("await를 통해 promise를 해결 가능",async()=>{
    async function asyncFunc(){
      return 1;
    }
    expect(await asyncFunc()).toBe(1);
  })

})