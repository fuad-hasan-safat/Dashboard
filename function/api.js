export async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }


  const isSpace = (char) => /\s/.test(char);



  export function countWords(content='  ', limit) {
    // console.log('in side api function --->><><><><><><<<<>>>><<<<>>> ---- content', content)
    let currentWord = 0;
    let inTag = false;
    let substring = "";
  
    for (const char of content) {
      if (isSpace(char) && !inTag) {
        currentWord++;
      } else if (char === '<') {
        inTag = true;
      } else if (char === '>') {
        inTag = false;
      } 
      // else if(char === '&'){
      //   inTag = true;
      // }else if(char === ';'){
      //   inTag = false;
      // }

      if(currentWord <=limit){
        substring += char;

      }
  
      if (currentWord === limit) {
        // Handle substring or other logic
        break;
      }
    }
  
  
    // Use the loop variable 'wordCount' directly
    
    return substring; // Consider character length for non-BMP characters
  }
  