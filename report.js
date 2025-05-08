function sortPages(pages) {
    const pagesArr = Object.entries(pages) //converts to array of array with comma seperated key value pair
    pagesArr.sort(
        (a,b) => {
        aHits = a[1]
        bHits = b[1]
        return b[1] - a[1] //see docs on sort(). Is accounts for negatives. a[1]-b[1] sorts least to geratest
         }
    )  
    return pagesArr
} 

function printReport(pages) {
    //log ==== and report
    //take result of sortPages fucntion
    //iterate
    //slice to obtain url and hits seperately
    //form sentence and log ===closing
    console.log('=====================================')
    console.log('REPORT')
    console.log('=====================================')
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const hits = sortedPage[1]
        //console.log(sortedPages)
        console.log(`Found ${hits} links to: ${url}.`)
        
    } 
    
    console.log('=====================================')
    console.log('END')
    console.log('=====================================')
}

module.exports = {
    sortPages,
    printReport
}