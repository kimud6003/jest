import {describe, test, expect,jest} from '@jest/globals';
import listUser from "./listUser"
import listMaker from "./listMaker"

jest.mock("./listMaker");

describe("Mock",()=>{

  test("MockName, getMockName 함수의 이름을 지어주고 가져올수있다",()=>{
    const mockFn = jest.fn().mockName("kud");
    expect(mockFn.getMockName()).toBe("kud");
  })

  
  test("mockReturnValue를 통해 값을 배출하는 함수를 만든다.",()=>{
    const mockFn = jest.fn().mockName("lcs");
    mockFn.mockReturnValue("1");
    expect(mockFn()).toBe("1");

    mockFn.mockReturnValue("2");
    expect(mockFn()).toBe("2");
  })

  test("mockImplemetation을 통해 함수를 지정",()=>{
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

  test("mock.calls,mock.results를 사용해서 호출된 argument와 result를 참조",()=>{
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

  test("toBeCalled,toBeCalledTimes,toBeCalledWith 을 통해 함수 호출이 되었는지 판단",()=>{
    const mockFn = jest.fn();
    mockFn("hello");
    expect(mockFn).toBeCalled();
    expect(mockFn).toHaveBeenCalled();

    expect(mockFn).toBeCalledWith("hello");

    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toHaveBeenCalledTimes(1);
  })

  test("spyOn을 통해 호출 여부와 어떻게 호출이 되었는지 알수있다",()=>{
    const sum ={
      add:(a,b)=>a+b
    };

    const spyfn = jest.spyOn(sum,"add");
    const results = sum.add(2,3);

    expect(spyfn).toBeCalled();
    expect(spyfn).toBeCalledWith(2,3);
    expect(results).toBe(5);
  })

  test("외부 라이버리에 Mock시켜서 몇번 실행되는지 확인",()=>{
    listUser();
    expect(listMaker).toBeCalledTimes(1);
  })
  
})
