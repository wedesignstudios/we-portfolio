const awsUrl = 'https://we-portfolio-resized.s3.amazonaws.com/';

const ImageSizePicker = {

  imgName: function(origName) {
    let nameMatch = origName.match(/^(.*?)\./);
    return nameMatch[1];
  },

  imgFileFormat: function(origName) {
    let formatMatch = origName.match(/\.([^.]*)$/);
    return formatMatch[0];
  },

  imgUrl: function(width, origName, thumb) {
    if(thumb) {
      return `${awsUrl}thumb/${this.imgName(origName)}_thumb_${width}${this.imgFileFormat(origName)}`
    }
    return `${awsUrl}${width}/${this.imgName(origName)}_${width}w${this.imgFileFormat(origName)}`
  },

  imgSize: function(origName) {
    return (
      {
        w300: this.imgUrl(300, origName),
        w450: this.imgUrl(450, origName),
        w800: this.imgUrl(800, origName),
        w1024: this.imgUrl(1024, origName),
        w1440: this.imgUrl(1440, origName),
        thumb180: this.imgUrl(180, origName, true),
        thumb300: this.imgUrl(300, origName, true)
      }
    )
  }

}

module.exports = ImageSizePicker;