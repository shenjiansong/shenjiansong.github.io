<!-- next:gcam002 --> 
<!-- pre:gcam900 --> 
<!-- title: 版本说明--> 
<!-- date:2023-12-21 --> 

### 不同品牌手机如何选择谷歌相机APP
>以8.8版本为例
![1384cfc555a3aaf75.jpeg](https://7up.pics/images/2023/12/21/1384cfc555a3aaf75.jpeg)

>三星手机，请下载samsung.apk结尾的apk安装使用

>一加手机，请下载onep.apk或者dy.apk结尾的apk安装使用

>oppo手机，请下载mtk.apk或者dy.apk结尾的apk安装使用

>vivo和真我手机，下载dy.apk结尾的apk安装使用

>小米或其他手机，直接下载kaka.apk结尾的apk安装使用，该版本为通用版

<font color=Red>说明：</font>

>dy.apk使用了抖音的包名，在Android中，包名是唯一的，不能安装两个一样的包名，所以这个apk跟抖音会冲突，并无法同时使用。

<font size=2 color=#998877>
之所有有这么多版本，是因为谷歌的安全机制限制了APP不受限制的获取镜头，
android有个白名单策略，只有在白名单中的APP，才能获取到所有的镜头，
比如Oppo手机，抖音这个应用就在白名单里面，所以下载包名为抖音的APP，
就能获取所有镜头。不过小米系统禁用了这个安全策略，所以可以不受限制。
因此这里每个版本都是可以使用的，区别在于能否获取到长焦镜头。
很多人问我能不能添加一个快手的Apk,不是我不能，是你们的系统没有把快手添加到白名单，所以即使改了快手包名，你们也一样用不了。如果你们通过下面查看白名单方式能找到新的包名，可以发给我，我可以新增包名。
</font>
 
<hr />

> 查看白名单方法
> 
> <font size=2>可以通过adb shell 执行下面命令查看</font> 
> <font size=1>
``` javascript
getprop vendor.camera.aux.packagelist
```
</font>

> 添加白名单方法
> 
> <font size=2>如果你已经获取root权限，可以通过下面的方法添加报名单</font>
>
``` javascript
setprop vendor.camera.aux.packagelist "com.agc.gcam8.8,之前的包名"
```
</font>

<!--
```
setprop ro.camera.privileged.3rdpartyApp "com.agc.gcam8.8"
```
-->
----
> [在线配置使用手册](./details.html?md=gcam101) 
> 
> [不同品牌手机如何选择谷歌相机](./details.html?md=gcam001) 
> 
> [百度网盘如何快速下载谷歌相机](./details.html?md=gcam002) 
> 
> [关于配置项的操作](./details.html?md=gcam003) 
>
> [关于库存(lib)的操作](./details.html?md=gcam004) 
>
> [关于水印设置的操作](./details.html?md=gcam005) 
>
> [关于水印配置详解的操作](./details.html?md=gcam006) 
>
> [关于LUT预览的操作](./details.html?md=gcam007) 
>
> [常见问题整理](./details.html?md=gcam900) 
>
> [后期优化内容](./details.html?md=gcam800) 
>