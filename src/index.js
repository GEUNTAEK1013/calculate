const calculator = document.querySelector(".calculator");
const buttons = calculator.querySelector(".calculator__buttons");

const firstOperend = document.querySelector(".calculator__operend--left");
const operator = document.querySelector(".calculator__operator");
const secondOperend = document.querySelector(".calculator__operend--right");
const calculatedResult = document.querySelector(".calculator__result");

function calculate(n1, operator, n2) {
  let result = 0;
  //1. n1,n2를 number 타입으로 변환
  //2. operator 구분: 조건문으로 결과를 구분하여 연산
  n1 = Number(n1);
  n2 = Number(n2);

  if (operator === "+") {
    result = n1 + n2;
  } else if (operator === "-") {
    result = n1 - n2;
  } else if (operator === "*") {
    result = n1 * n2;
  } else if (operator === "/") {
    result = n1 / n2;
  }

  return String(result);
}

buttons.addEventListener("click", function (event) {
  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;

  if (target.matches("button")) {
    if (action === "number") {
      /*
        1. 첫 번째 칸에 입력된 내용이 있는지 없는지 구분
        - 첫번째 칸에 입력된 내용이 없는 경우: 첫번째 칸에 입력
        - 첫번째 칸에 입력된 내용이 있고, 0인 경우: 첫번째 칸에 입력
        - 첫번째 칸에 입력된 내용이 있고, 0이 아닌 경우: 두번째 칸에 입력 
      */
      if (firstOperend.textContent === "" || firstOperend.textContent === "0") {
        firstOperend.textContent = buttonContent;
      } else {
        secondOperend.textContent = buttonContent;
      }
    }

    if (action === "operator") {
    }

    if (action === "decimal") {
    }

    if (action === "clear") {
      firstOperend.textContent = 0;
      secondOperend.textContent = 0;
      calculatedResult.textContent = 0;
    }

    if (action === "calculate") {
      //calculate 함수 실행
      let num1 = firstOperend.textContent;
      let num2 = secondOperend.textContent;
      let result = calculate(num1, operator.textContent, num2);
      calculatedResult.textContent = result;
    }
  }
});

const display = document.querySelector(".calculator__display--for-advanced");
let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener("click", function (event) {
  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;

  if (target.matches("button")) {
    //기능1: 숫자 누르는 대로 출력하기
    //1. 누르면 화면에 차례대로 추가로 기록되어야 한다.
    //2. 첫 시작 숫자가 0인 경우에는 입력값을 추가가 아닌 처음부터 넣기
    //3. 입력한 숫자를 previousNum에 저장

    //기능2: 연산자 버튼을 누르기
    //1. 이전에 입력한 값이 있다면: 연산자 저장
    //2. 이전에 입력한 값이 없다면: 연산자 저장X

    //기능3: 연산자 키를 누른 후 숫자 출력하기
    //1. 직전의 값이 연산버튼이고, 저장된 연산자가 있을 경우: 숫자 새로 입력
    //2. 직전의 값이 연산버튼이 아닐 경우: 기능1
    //3. 숫자 새로 입력시: 이전의 숫자는 firstNum에 저장

    //기능4. 계산결과 출력하기 - calculator 함수 그대로 사용

    //기능5. 초기화

    //초기화 해야할 값: 첫 번째 입력값, 연산자 기호, 두 번째 입력값, 계산기의 화면

    //기능6. 소수입력
    //이전에 입력한 키가 연산자이고, 연산자가 있을 때 소수점 입력
    //화면에 입력한 내용에 .이 없다 and 이전에 입력한 키가 소수점 키가 아닌경우: 출력

    //기능7. enter 여러 번 눌렀을 때 연속으로 연산
    //기존에 enter 전에 n1는 firstNum, operator, n2는 previousNum
    //이전에 눌렀던 키가 enter인 경우: n1=화면, operator 그대로, n2도 그대로

    //기능8. 연산자 버튼이 없을 때 실수로 enter를 눌러도 정상 작동
    //연산자 값이 있는 경우에만: enter기능 실행

    //기능9. 연산자 여러 번 눌러도 영향 없도록 -> 기능2에서 구현함
    //연산자가 있을 경우: 마지막에 누른 값으로 변경

    //기능10. 숫자, 연산자, enter의 순서로 눌렀을 때에도 작동
    //두번째 숫자가 없을 경우: 첫번째 기존의 숫자가 두번째 숫자가 된다.

    //기능11. 연산자를 연속으로 눌러도 계산이 계속되도록
    //100+20-20 -> 120-20
    //기존의 숫자가 있을 경우: 연산자 저장
    //연산자가 있고, 첫번째 숫자와 두번째 숫자가 있는 경우: 결과를 첫번째 숫자에 넣고 현재 연산자를 저장

    if (action === "number") {
      //기능3
      if (previousKey === "operator" && operatorForAdvanced) {
        firstNum = display.textContent;
        previousNum = buttonContent; //갱신
        display.textContent = "";
      }
      //기능1
      if (display.textContent === "" || display.textContent === "0") {
        display.textContent = buttonContent;
        previousNum = buttonContent;
      } else {
        display.textContent += buttonContent;
        previousNum += buttonContent;
      }
    }
    if (action === "operator") {
      //기능2
      if (firstNum && previousNum && operatorForAdvanced) {
        display.textContent = calculate(
          firstNum,
          operatorForAdvanced,
          previousNum
        );
        firstNum = display.textContent;
        previousNum = undefined;
      }
      operatorForAdvanced = buttonContent;
    }
    if (action === "decimal") {
      //기능6
      let isDecimal = display.textContent.indexOf(".");
      if (isDecimal === -1 && previousKey !== "decimal") {
        if (previousKey === "operator" && operatorForAdvanced) {
          firstNum = display.textContent;
          display.textContent = "0.";
          previousNum = "0.";
        } else {
          display.textContent += ".";
          previousNum += buttonContent;
        }
      }
    }
    if (action === "clear") {
      //기능5
      firstNum = undefined;
      previousNum = undefined;
      operatorForAdvanced = undefined;
      display.textContent = "0";
    }
    if (action === "calculate") {
      //기능8
      if (operatorForAdvanced) {
        //기능4
        let n1 = firstNum;
        let operator = operatorForAdvanced;
        let n2 = previousNum;
        //기능7
        if (previousKey === "calculate") {
          n1 = display.textContent;
        }
        //기능10
        if (n1 === undefined) {
          n1 = previousNum;
        }
        let result = calculate(n1, operator, n2);
        display.textContent = result;
      }
    }

    //이전에 누른 버튼의 종류 갱신하기
    previousKey = action;
  }
});
