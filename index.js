const express=require("express");
const request=require('request-promise');
const cheerio=require('cheerio');
const path = require('path');

const app=express();
const port=process.env.PORT||3000;
app.listen(port, ()=>{
   console.log(`server running on ${port}`);
});
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Header",
     "Origin, X-Requested-With, Content-Type, Accept"
     );
     res.setHeader(
         "Access-Control-Allow-Methods",
         "GET, POST, PATCH, DELETE, OPTIONS"
     );
    next();
  });
 
  app.get("/chartData",async(req,res,next)=>{
    try{
        const result=await request.get( "https://www.mohfw.gov.in/");
        const $ = cheerio.load(result);
         let stateNames=[];
        let confirmedIndians=[];
        let confirmedForeigns=[];
        let curedCases=[];
        let deathCases=[];
        let chartData={};
        $("#cases > div > div > table > tbody > tr")
        .each((index, element)=>{
            const tds=$(element).find("td");

         const  stateName=$(tds[1]).text();       
          stateNames.push(stateName);
          const confirmedIndian=$(tds[2]).text();
          confirmedIndians.push(confirmedIndian);
        
          const confirmedForeign=$(tds[3]).text();
          confirmedForeigns.push(confirmedForeign);
          const cured=$(tds[4]).text();
          curedCases.push(cured);
          const death=$(tds[5]).text();
          deathCases.push(death);
           chartData={
              stateNames:stateNames,
              confirmedIndians:confirmedIndians,
              confirmedForeigns:confirmedForeigns,
              curedCases:curedCases,
              deathCases:deathCases
          };


        });
            res.setHeader("Content-Type","application/json");
             res.json(chartData);
             next();
        } catch(err){
            console.log(err);
             if(!err.statusCode){
             err.statusCode=500;
          }
              next(err);
        }
    });
    app.get("/tableData",async(req,res,next)=>{
        try{
            const result=await request.get( "https://www.mohfw.gov.in/");
            const $ = cheerio.load(result);
       
          const tableDatas=[];
          $("#cases > div > div > table > tbody > tr")
            .each((index, element)=>{
                const tds=$(element).find("td");
            
             const  stateName=$(tds[1]).text(); 
                
             const confirmedIndian=$(tds[2]).text();
             const confirmedForeign=$(tds[3]).text();
             const cured=$(tds[4]).text();
             const death=$(tds[5]).text();
             const tableData={
                 stateName,
                  confirmedIndian,
                 confirmedForeign,
                   cured,
                death
              };
              tableDatas.push(tableData);
               
              
    
    
            });
                res.setHeader("Content-Type","application/json");
                 res.json(tableDatas);
                 next();
            } catch(err){
                console.log(err);
                 if(!err.statusCode){
                     console.log(err);
                 err.statusCode=500;
              }
                  next(err);
            }
        });

           
       
app.get("/otherDetails",async(req,res,next)=>{
    try{
    const result=await request.get( "https://www.mohfw.gov.in/");
    const $ = cheerio.load(result);
   // const lastUpdated=$("#cases > div > p > strong").text().slice(37,59);
    const lastUpdated=$("#site-dashboard > div > div > div > div > div > h2 > span").text().slice(8,37);
   
    // console.log(lastUpdated);
  //  const totalPassengersScreendAirport=$("body > div.main-section > div > div.contribution.col-sm-9 > div > div > div:nth-child(1) > div > span").text();

   const totalCasesInIndia=$("#site-dashboard > div > div > div > div > ul > li.bg-blue > strong").text();

    const totalCured=$("#site-dashboard > div > div > div > div > ul > li.bg-green > strong").text();

    const totalDeaths=$("#site-dashboard > div > div > div > div > ul > li.bg-red > strong").text();


    const otherDetails={
       lastUpdated: lastUpdated,
   //     totalPassengersScreendAirport: totalPassengersScreendAirport,
        totalCasesInIndia:totalCasesInIndia,
        totalCured:totalCured,
        totalDeaths:totalDeaths
    }
    res.json(otherDetails);
    next();
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
});
app.get("/links",async(req,res,next)=>{
    try{
        const result=await request.get( "https://www.mohfw.gov.in/");
        const $ = cheerio.load(result);
      const districtWiseCases=$("#sticky-wrapper > div > div > div > div > div > div > nav > ul > li:nth-child(4) > a").attr("href");
        //   console.log(districtWiseCases);
        const helplineLink=$("body > div > header > div.header-bottom > div > div > div > div:nth-child(4) > strong > a").attr("href");

        const faqLink=$("#site-faq > div > div > div > div > div > a").attr("href");
  //  const socialAdvisoryLink=$("#dvC > table > tbody > tr:nth-child(2) > td:nth-child(2) > a").attr("href");
       let links={
        //    districtWiseCases:districtWiseCases,
           helplineLink:helplineLink,
           faqLink:faqLink
         //  socialAdvisoryLink:socialAdvisoryLink
       };
    //    console.log(links.districtWiseCases);
       res.json(links);
          next();
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
   
   
})
app.get("/latestUpdateSection",async(req,res,next)=>{
    try{
        const result=await request.get( "https://www.mohfw.gov.in/");
        const $ = cheerio.load(result);
        let allDates=[];
        let allLinksText=[];
        let allLinks=[];
        let latestUpdateSection={};
        $("#latest-update > div > div.row.equal-height > div > div > p>strong").each((index, element)=>{
            const dates=$(element).text();
            allDates.push(dates);
             latestUpdateSection.allDates=allDates;
            
        })
       
        $("#latest-update > div > div.row.equal-height > div:nth-child(n) > div > p > a ").each((index, element)=>{
            const dataTexts=$(element).text();
            allLinksText.push(dataTexts);
            latestUpdateSection.allLinksText=allLinksText;
            
        })
        $("#latest-update > div > div.row.equal-height > div:nth-child(n) > div > p > a ").each((index, element)=>{
            const links=$(element).attr("href");
            allLinks.push(links);
             latestUpdateSection.allLinks=allLinks;
            
        })
        res.setHeader("Content-Type","application/json");
      res.json(latestUpdateSection);
          next();
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
   
  
 //$("#node-39071 > div > div > div > div > div:nth-child(2) > div.accordDetail > p:nth-child(1) > span > span > a").attr("href")

})
app.get("/awarenessData",async(req,res,next)=>{
    try{
        const result=await request.get( "https://www.mohfw.gov.in/");
        const $ = cheerio.load(result);
        let allTitles=[];
        let allDates=[];
        let allTitlesLinks=[];
       
        let awarenessData={};
        $("#site-advisories > div > div:nth-child(2) > div > div > div > div:nth-child(8) > div > ul > li:nth-child(n) > span").each((index, element)=>{
            const dates=$(element).text();
            // allTitles.push(titles);
            // awarenessData.allTitles=allTitles;
            allDates.push(dates);
            // awarenessData.allDates=allDates;
            
        })
        $("#site-advisories > div > div:nth-child(2) > div > div > div > div:nth-child(8) > div > ul > li:nth-child(n) > a").each((index, element)=>{
            const titles=$(element).text();
            allTitles.push(titles);
            awarenessData.allTitles=allTitles;
           
            
        })
       
        
        $("#site-advisories > div > div:nth-child(2) > div > div > div > div:nth-child(8) > div > ul > li:nth-child(n) > a").each((index, element)=>{
            const titleLinks=$(element).attr("href");
            allTitlesLinks.push(titleLinks);
            awarenessData.allTitlesLinks=allTitlesLinks;
            
        })
        // console.log(awarenessData);
        res.setHeader("Content-Type","application/json");
      res.json(awarenessData);
          next();
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
   
   //$("#dvA > table > tbody > tr:nth-child(1) > td").text()

})
// app.get("/testingLabs",async(req,res,next)=>{
//     try{
//         const result=await request.get( "https://www.icmr.nic.in/node/39071");
//         const $ = cheerio.load(result);
//         let allLabsTitles=[];
//         let allLabsTitlesLinks=[];
        
//         let testingLabs={};
//         $("#node-39071 > div > div > div > div > div:nth-child(2) > div.accordDetail > p:nth-child(1) > span > span ")
//         .each((index, element)=>{
//             const titles=$(element).text();
//             allLabsTitles.push(titles);
//             testingLabs.allLabsTitles=allLabsTitles;
            
//         })
       
        
//         $("#node-39071 > div > div > div > div > div:nth-child(2) > div.accordDetail > p:nth-child(1) > span > span > a")
//         .each((index, element)=>{
//             const titleLinks=$(element).attr("href");
//             allLabsTitlesLinks.push(titleLinks);
//             testingLabs.allLabsTitlesLinks=allLabsTitlesLinks;
            
//         })
//         res.setHeader("Content-Type","application/json");
//       res.json(testingLabs);
//           next();
//     }catch(err){
//         if(!err.statusCode){
//             err.statusCode=500;
//         }
//         next(err);
//     }
   
//    //$("#dvA > table > tbody > tr:nth-child(1) > td").text()

// })


