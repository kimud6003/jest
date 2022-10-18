import {describe, test, expect} from '@jest/globals';

describe('Matcher 메소드 설명입니다',()=>{

  test("Tobe method는 object.is로 작동됩니다",()=>{
    expect(1).toBe(1);
  })

  test("toBe method는 모든 필드를 재귀적으로 확인X",()=>{
    const obj = {one:1} // 1번주소에 obj {one:1}
    // const objPrime = obj;
    expect(obj).not.toBe({one:1}); // X'주소에 {one:1}
  })

  test("not method는 Not비교가 가능합니다",()=>{
    expect(1).not.toBe(2);
  })

  test("obj 객체 안의 property key-value값을 참조할수 있다.",()=>{
    const obj = {a:true, b:2, c:{d:3}};
    expect(obj).toHaveProperty("a");
    expect(obj).toHaveProperty("a",true);
  })

  test("toHaveLength Literable한 요소의 길이를 확인할수있다.",()=>{
    expect([1,2,3]).toHaveLength(3);
    expect("123").toHaveLength(3);
  })

  test("toEqual Method는 toBe랑 다르게 모든 필드를 재귀적으로 확인한다",()=>{
    const obj = {one:1} // 1번주소에 obj {one:1}
    obj["two"] = 2;
    expect(obj).toEqual({one:1,two:2}); // X'주소에 {one:1}
    expect(obj).toEqual({one:1,two:2,three:undefined}); // X'주소에 {one:1}
  })

  test("toStrictEqual Method는 toEqual랑 다르게 모든 필드를 재귀적으로 확인, undefined 체크",()=>{
    const obj = {one:1} // 1번주소에 obj {one:1}
    obj["two"] = 2;
    expect(obj).toStrictEqual({one:1,two:2}); // X'주소에 {one:1}
    expect(obj).not.toStrictEqual({one:1,two:2,three:undefined}); // X'주소에 {one:1}
  })

  test("toStrictEqual Method는 객체 리터럴, 인스턴스를 다르게 판단한다",()=>{
    class orign {
      constructor(key){
        this.key = key;
      }
    }
    const orginal = new orign(1); // new로 생성된 객체는 주소가 다르다.
    const compare = {key:1}; // 객체 리터럴로 생성된 객체는 주소가 같다.

    expect(orginal).not.toStrictEqual(compare);
  })

  test("null, undefined,false 참거짓 비교",()=>{
    const n =null;
    expect(n).toBeNull(); //null 에만 일치
    expect(n).toBeDefined(); // 정의된 값에만 일치
    expect(n).not.toBeUndefined(); // tobeDefined와 반대
    expect(n).not.toBeTruthy(); // true에 일치
    expect(n).toBeFalsy(); // false에 일치
  })

  test("숫자를 비교하는 메소드",()=>{
    const value = 4;
    expect(value).toBeGreaterThan(3); //초과
    expect(value).toBeGreaterThanOrEqual(4); //이상
    expect(value).toBeLessThan(5); //미만
    expect(value).toBeLessThanOrEqual(4); //이하

    expect(value).toBe(4);
    expect(value).toEqual(4);
  })

  test("toMatch 정규식과 문자열을 비교해서 검색 가능",()=>{
    expect("team").not.toMatch(/I/);
  })

  test("toContain 배열안에 특정 요소가 있는지 확인",()=>{
    expect("team").toContain("t");
    expect([1,2,3]).toContain(1);
  })

  test("reject를 통해 reject상태의 값을 반환",()=>{
  function ErrorFunc(){
    throw new Error("error");
  }

  expect(ErrorFunc()).toThrow("error");
  })

})