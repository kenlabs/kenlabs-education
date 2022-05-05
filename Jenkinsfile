/*
    产品持续交付构建文件（OSS 静态文件网站）

    以下环境变量在构建时提供，配置在项目中

    SITE_ID: 部署站点唯一标识
    SITE_TOKEN: 站点部署令牌
 */
pipeline {
  agent any
  environment {
    DEPLOY_SERVER = "oss-deployer.cdqxtech.com"
  }
  stages {
    stage('检出') {
      steps {
        checkout([$class           : 'GitSCM',
                  branches         : [[name: env.GIT_BUILD_REF]],
                  userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]
        ])
      }
    }
    stage('构建') {
      steps {
        sh "yarn config set ignore-engines true"
        sh "yarn"
        sh "yarn generate"
        sh "zip dist.zip -r dist/"
      }
    }
    stage('发布') {
      steps {
        sh "curl -X POST 'https://${DEPLOY_SERVER}/site/deploy?id=${SITE_ID}&token=${SITE_TOKEN}' -H 'accept: */*' -H 'Content-Type: multipart/form-data' -F 'file=@dist.zip;type=application/zip'"
      }
    }
  }
}
