export function imgSrc(url: string, width: number, fit = 'crop') {
    if (!url) {
      throw new Error('No `url` argument available.');
    }
  
    if (!width) {
      console.warn(
        "You did not include a `width` argument, the image will be source size, that's probably not what you're intending to do.",
      );
      return url;
    }
    
    return `https://content.gotripod.com/cdn-cgi/image/width=${width},fit=${fit}/${url}`
  }
  
  export function imgSrcSet(url: string, widths: number[], fit = 'crop') {
    return widths
      .sort((a, b) => a - b)
      .map((width) => {
        return `${imgSrc(url, width, fit)} ${width}w`;
      });
  }