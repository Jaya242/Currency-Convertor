const BASEURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdowns=document.querySelectorAll(".drop-down select")
const btn=document.querySelector("#btn")
const fromCurrency=document.querySelector(".from select")
const toCurrency=document.querySelector(".to select")
const msg=document.querySelector(".msg")


for(let select of dropdowns){
    for(Currcode in countryList){
        var option=document.createElement("option")
        option.value=Currcode;
        option.innerText=Currcode;
        select.append(option);
        if(select.name=="from" && Currcode=="USD"){
            option.selected=true;
        }
        else if(select.name=="to" && Currcode=="INR"){
            option.selected=true;
        }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target)
    }
    )
    }
}

const updateflag=(element)=>{
    let Currcode=element.value;
    let countrycode=countryList[Currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;

}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})
const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==""||amtval<1){
        amtval=1;
        amount.value="1";
    }
    // console.log(fromCurrency.value,toCurrency.value)
    // const url=`${BASEURL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json?amount=${amtval}`;
    const url = `${BASEURL}/${fromCurrency.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    // let rate=data[toCurrency.value];;
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    console.log(rate)
    let finalamt=amtval*rate;
    msg.innerText=`${amtval}${" "}${fromCurrency.value} = ${finalamt}${" "}${toCurrency.value.toUpperCase()}`

}
window .addEventListener("load",()=>{
    updateExchangeRate()
})
