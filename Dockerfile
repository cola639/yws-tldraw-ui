FROM nginx:1.22

# 构建参数,在Jenkinsfile中构建镜像时定义
# ARG PROFILE

# 将dist文件中的内容复制到容器 `/usr/share/nginx/html` 这个目录下面
COPY dist/ /usr/share/nginx/html/

# 容器内部运行的端口 声明不起实际作用
EXPOSE 80 


