const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const { By } = require('selenium-webdriver');

const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

const test = async () => {


    
    const driver = new webdriver.Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless()).build();
    console.log('Loading Webpage');
	await driver.get(`http://localhost:3000`);

    console.log("Test: Check to see if the app loads sucessfully");
    const pagetitle= await driver.getTitle();
if (pagetitle=="Checklist"){
console.log("Test Sucessfull")

}
else{
    console.log("Test Failed")
}



console.log("Test 2 : Add new Item to checklist")
 let current_items= await driver.findElements(By.css(".current_tasks"));
 const test =await driver.findElement(By.css(".enter_new_item_box")).sendKeys("This is test item");
 await driver.findElement(By.css(".add_btn")).click();
 let updated_items= await driver.findElements(By.css(".current_tasks"));
           
if (current_items.length+1==updated_items.length){
console.log("Test Sucessfull")

}
else{
    console.log("Test Failed")
}

console.log('Test 3 : Verify new  added item in list')
       const  newly_added_Item = await driver.findElements(By.css(".item_names"))
     
        if (await newly_added_Item[newly_added_Item.length-1].getText() == "This is test item"){
            console.log("Test Sucessfull")
            
            }
            else{
                console.log("Test Failed")
            }

            console.log('Test 4  : Remove new  added item ')
           const  added_tasks = await driver.findElements(By.css(".current_tasks"))
            
            const delete_btns= await driver.findElements(By.css(".delete-button"));
     
            await delete_btns[delete_btns.length-1].click();

             await sleep(5000);
          const  removed_added_tasks = await driver.findElements(By.css(".current_tasks"))
           




            if (added_tasks.length == removed_added_tasks.length+1){
                console.log("Test Sucessfull")
                
                }
                else{
                    console.log("Test Failed")
                }
            
                console.log('Test 5  : Check if correct item is added')
                
                const field =await driver.findElement(By.css(".enter_new_item_box")).sendKeys("This is test item");
                await driver.findElement(By.css(".add_btn")).click();
                const updated_Items_check= await driver.findElements(By.css(".current_tasks"));
                
                
                
                if (await updated_Items_check[updated_Items_check.length-1].getText() == "This is test item"){
                    console.log("Test Sucessfull")
                    
                    }
                    else{
                        console.log("Test Failed")
                    }

}

test();