## LightAnno - Web-based Annotator

This tool allows users to give annotation on images and export as JSON files.


### Requirement

This tool require Apache or similar web server serves as backend engine.

### Screenshots

![](https://github.com/tirthysw/light_anno/raw/master/docs/lightanno_.jpg)
 

* * *
### Quick Start

1. setup apache servers 

2. open the tool via access this url:
    
    ```
    http://localhost/lightnote/lightDraw2.html?img=Images/02_2.jpg&imid=1&dbsid=1&dbnum=20 
    ```
    use GET token to specify the path of an image ("img=Images/02_2.jpg")


* please notices that one of the library, KineticJS, stops supporting anymore.([see issue](https://github.com/ericdrowell/KineticJS/issues/1048))
  we directly upgraded to latest version, but it might contains some errors.

#### How to Add Box Proxy?

1.  Press "Add Box Proxy" Button.
2.  Adjust the Top face of Box.

![](https://github.com/tirthysw/light_anno/raw/master/docs/top.JPG)

4.  Press "Action Done Button " and Adjust the Bottom face of Box.

![](https://github.com/tirthysw/light_anno/raw/master/docs/bot.JPG)

6.  Select a tag.
7.  Press "Action Done" Button to lock proxy.

#### How to Add Space Corner?

1.  Press "Add Space Proxy" Button.
2.  Adjust four dots to fit walls and floor.
3.  Press "Action Done" Button to lock proxy.

![](https://github.com/tirthysw/light_anno/raw/master/docs/space.JPG)

#### How to delete proxy?

1.  Press "Save proxy button" to enter delete selection mode.
2.  Move to proxy and left click to delete object.
3.  Press Action Done Button to leave delete mode.

#### How to save annotation result?

1.  Press "Save Button" to save and leave.


### Notices
#### Keep Box Orientation Consistent

The <font style="color:red;">Red</font> dots should always be placed on left side.  

![](https://github.com/tirthysw/light_anno/raw/master/docs/test_p.JPG)



### For Further Developments 

There are three major script files:

Main Entry and logic control:[lightDraw2.html](https://github.com/tirthysw/light_anno/blob/master/lightDraw2.html)

JS State Machine:[statetools.js](https://github.com/tirthysw/light_anno/blob/master/statetools.js)

WebGL Warpper:[utility.js](https://github.com/tirthysw/light_anno/blob/master/utility.js)






