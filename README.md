# 구텐베르크, 워드프레스 리액트 관련 스터디

## yarn 설치
npm 보다 yarn을 더 선호한다. yarn 설치를 하자.

[Yarn 설치하기](https://classic.yarnpkg.com/en/docs/install#debian-stable)


## package.json 파일 만들기
`yarn init`으로 먼저 package.json 파일을 만들자. 몇몇 부분들은 유사하게 반복 사용될 부분이 있어 보이므로
여기에 노트한다. 

* `scripts` 키의 값으로 아래를 참고하자.
* `license` 라이센스 항목은 [SPDX license expression syntax version 2.0 string](https://spdx.org/licenses/)을 참고하자.

```
{
  ...
  "scripts": {
    "start": "wp-scripts start",
    "build": "wp-scripts build"
  },
  ...
  "license": "GPL-2.0-or-later"
}
```

## 