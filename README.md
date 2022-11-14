<div align=center>
  <img width="700px" src="https://user-images.githubusercontent.com/67793530/201619281-bda3e328-e275-4c99-8fb9-f18ae5b5689f.png"/>
</div>

# ENGINEAR
```
이 프로젝트는 Near Protoco 기반의 검증 노드, 익스플로러, 지갑을 구현하여 연동하는 프로젝트입니다.
```
1. 로컬에서 신규 네트워크의 Validator Node 두 개를 실행 시키고, 두 노드가 서로 합의 알고리즘에 의해 블록을 생성하도록 하였습니다. 
2. 두 노드가 생성하는 블록 데이터와 연동되는 익스플로러를 구현하였습니다. (테스트넷 연동 포함)
3. 지갑을 구현하였습니다. `미완성`

<br/>

## I. 니어 프로토콜(NEAR Protocol)
```
이더리움, EOS와 같은 스마트 컨트랙트를 지원하는 퍼블릭 체인입니다. 
TPoS (Thresholded Proof of Stake) 컨센서스를 활용하며 자체 확장성 솔루션인 Nightshade와 Doomslug 합의 메커니즘을 사용합니다.
```
<details>
<summary>자세한 특징 확인하기 (토글해주세요)</summary>
<div markdown="1">       

### Nightshade

- Nightshade는 니어 프로토콜 의 샤딩 시스템으로 트랜잭션 처리 작업을 여러 검증자 노드로 분할하여 데이터를 보다 효율적으로 처리할 수 있습니다. 

### Doomslug

- Doomslug는 검증인(validators) 노드들이 지분을 기반으로 직접 경쟁할 필요 없이 차례대로 블록을 생성할 수 있어 효율성과 블록 완결성을 동시에 높일 수 있습니다.

### **Thresholded Proof of Stake(TPoS)**

**용어**

---

`witness` : 채굴자들

`epoch` : witness들이 유효한 기간 기본값은 24시간임(정확히는 블록 개수로 측정됨)

`slot` : 블록을 생성하기 위해 witness들에게 임의의 번호를 매겨놓은 블록. 1분에 한 slot씩 존재하며 한 epoch에는 1440slot이 존재

`seat` : slot안에 배치된 각 witness들의 자리. 한 slot에 1024seat이 있음

---

**Witness 선정과정**

1. 1분의 한 slot씩 총 1440slot이 존재하고 한 slot에 1024seat씩 존재한다. 즉 총 1,474,560 seat이 존재하고 이를 witness들이 나눠서 차지한다. 스테이킹된 총량을 1,474,560으로 나눈 값이 seat 하나의 가격이 되고 이에 따라 seat을 할당받는다.
2. 할당받은 후에는 각 slot의 seat을 차지한 witness들이 PoS로 블록을 생성한다.
3. 하루가 지나면 witness를 새로 선정한다.

<img width="671" alt="image" src="https://user-images.githubusercontent.com/67793530/201620591-9ed05256-0143-4a77-af5d-3cdb7fc8af50.png">

</div>
</details>

<br/>

## II. 시작하기
<details>
<summary>로컬 노드 생성 및 연동</summary>
<div markdown="1"> 

### 하드웨어 요구 사항

- **Recommended**
    
    
    | HARDWARE | RECOMMENDED SPECIFICATIONS |
    | --- | --- |
    | CPU | x86_64 (Intel, AMD) processor with at least 8 physical cores |
    | CPU Features | CMPXCHG16B, POPCNT, SSE4.1, SSE4.2, AVX |
    | RAM | 24GB DDR4 |
    | Storage | 1TB SSD (NVMe SSD is recommended. HDD will be enough for localnet only) |
- **Minimal**
    
    
    | HARDWARE | MINIMAL SPECIFICATIONS |
    | --- | --- |
    | CPU | x86_64 (Intel, AMD) processor with at least 8 physical cores |
    | CPU Features | CMPXCHG16B, POPCNT, SSE4.1, SSE4.2, AVX |
    | RAM | 16GB DDR4 |
    | Storage | 500GB SSD (NVMe SSD is recommended. HDD will be enough for localnet only) |

### Prerequisites

- Rust
- Git
- 개발자 도구:
    - MacOS
        
        ```bash
        $ brew install cmake protobuf clang llvm awscli
        ```
        
    - Linux
        
        ```bash
        $ apt update
        $ apt install -y git binutils-dev libcurl4-openssl-dev zlib1g-dev libdw-dev libiberty-dev cmake gcc g++ python [docker.io](http://docker.io/) protobuf-compiler libssl-dev pkg-config clang llvm cargo awscli
        ```
        

### Make Localnet

- Clone nearcore project

```bash
$ git clone https://github.com/near/nearcore
```

- Near의 Stable 버전 맞추기

```bash
$ git checkout tags/1.29.0
```

- Compile nearcore binary

```bash
$ make neard
```

- 운용할 Local Node 생성

```bash
$ ./target/release/neard --home ../node0 init --chain-id localnet
$ ./target/release/neard --home ../node1 init --chain-id localnet
```

- genesis.json 설정
    - 각 로컬노드 폴더에 있는 validator_key.json에 있는 account_id를 unique 값으로 변경d
        - Ex) node0의 account_id 는 node0으로
        - Ex) node1의 account_id 는 node1으로
    - genesis.json에 있는 validators 리스트를 각 로컬 노드의 validator_key.json의 public_key 값과 account_id를 넣고 amount값은 임의로 설정
        
        ```jsx
        "validators": [
            {
              "account_id": "node0",
              "public_key": "ed25519:6WbNbbUjcbbuc51E1bfwhJtdxQH8sx3MxrfBXrz4d4j3",
              "amount": "11"
            },
            {
              "account_id": "node1",
              "public_key": "ed25519:g4wRYxU51j13mM212PjVxbXk5tzDDM78g4a5Z6Nu2cP",
              "amount": "5"
            }
          ],
        ```
        
    - records 리스트도 Account와 AccessKey를 각 노드의 account_id, public_key, amount, locked에 정보에 일치하게 구성
        
        ```
        "records": [
            {
              "Account": {
                "account_id": "node0",
                "account": {
                  "amount": "100",
                  "locked": "11",
                  "code_hash": "11111111111111111111111111111111",
                  "storage_usage": 0,
                  "version": "V1"
                }
              }
            },
            {
              "AccessKey": {
                "account_id": "node0",
                "public_key": "ed25519:6WbNbbUjcbbuc51E1bfwhJtdxQH8sx3MxrfBXrz4d4j3",
                "access_key": {
                  "nonce": 0,
                  "permission": "FullAccess"
                }
              }
            },
            {
              "Account": {
                "account_id": "node1",
                "account": {
                  "amount": "100",
                  "locked": "5",
                  "code_hash": "11111111111111111111111111111111",
                  "storage_usage": 0,
                  "version": "V1"
                }
              }
            },
            {
              "AccessKey": {
                "account_id": "node1",
                "public_key": "ed25519:g4wRYxU51j13mM212PjVxbXk5tzDDM78g4a5Z6Nu2cP",
                "access_key": {
                  "nonce": 0,
                  "permission": "FullAccess"
                }
              }
            }
          ]
        ```
        
    - protocol_treasury_account 값은 하나의 노드 account_id를 입력
        
        ```jsx
        "protocol_treasury_account": "node0"
        ```
        
    - 위의 모든 작업을 완료한 genesis.json 파일을 다른 로컬 노드들의 genesis.json 파일에 복붙해서 모두 동일한 내용의 genesis.json 파일을 가지고 있도록 작업
    - **초기 블록 생성 조건**
    노드 하나의 ”locked”값의 전체 “locked”값의 2/3를 초과해야 함
- config.json 설정
    - 각 노드의 config.json 파일 안에 있는 rpc addr의 포트번호를 각 노드 모두 다르게 설정
    - network addr의 값도 각 노드 모두 다르게 설정
    - network boot_nodes의 값은 모두 동일하게 설정하되 규칙이 존재
        - public_key@network_addr
- config.json 예시
**빨간색** 부분만 다르면 됨

```json
// FXZXGq5sWtCfAJHdHnNhYnsy53wGJ7Gth1fCw2RwnXAS 노드의 config.json
"rpc": {
    "addr": "0.0.0.0:**3030**",
}
//...중략
"network": {
    "addr": "0.0.0.0:**24567**",
    "boot_nodes": "ed25519:FXZXGq5sWtCfAJHdHnNhYnsy53wGJ7Gth1fCw2RwnXAS@0.0.0.0:24567,ed25519:CGhdeMo5wimwnVnvQLHE7HxNq5vF432Aze14qC6GdZ7i@0.0.0.0:24568"
}
```

```json
// CGhdeMo5wimwnVnvQLHE7HxNq5vF432Aze14qC6GdZ7i 노드의 config.json
"rpc": {
    "addr": "0.0.0.0:**3031**",
}
//...중략
"network": {
    "addr": "0.0.0.0:**24568**",
    "boot_nodes": "ed25519:FXZXGq5sWtCfAJHdHnNhYnsy53wGJ7Gth1fCw2RwnXAS@0.0.0.0:24567,ed25519:CGhdeMo5wimwnVnvQLHE7HxNq5vF432Aze14qC6GdZ7i@0.0.0.0:24568"
}
```

- 각 노드들을 생성할 때 자동으로 같이 생성된 data 파일들을 삭제
- Terminal을 노드 개수에 맞게 오픈해서 각 터미널에 서로 다른 노드들을 실행
    
    ```bash
    # terminal 1
    ./target/release/neard --home ../**node0** run
    
    # terminal 2
    ./target/release/neard --home ../**node1** run
    ```
    
- 현재 실행하는 노드의 개수가 validators로 표시되고 peers의 숫자는 현재 운용하는 터미널의 노드와 연결된 다른 노드들의 개수를 표시해준다.
    
   <img width="1253" alt="image" src="https://user-images.githubusercontent.com/67793530/201621691-d6895b47-212c-4e87-b50e-fe057c89b988.png">

</div>
</details>

<details>
<summary>익스플로러 실행</summary>
<div markdown="1">  

<br/>

1. 프로젝트 깃을 클론 받습니다.
2. 루트에서 다음 명령어를 실행하여 익스플로러를 띄웁니다.
```
cd explorer
yarn start
```
3. 띄워진 익스플로러는 기본적으로 Testnet을 바라보고 있습니다. 만약 로컬 노드를 띄운 후 연동하고 싶다면, Localnet 으로 변경해주세요.
<img width="1255" alt="image" src="https://user-images.githubusercontent.com/67793530/201622418-f84785a5-2571-4fe1-a138-6ff87d9ac41f.png">

  
</div>
</details>

<details>
<summary>지갑 실행</summary>
<div markdown="1">

<br/>

1. 프로젝트 깃을 클론 받습니다.
2. 루트에서 다음 명령어를 실행하여 익스플로러를 띄웁니다.
```
cd wallet
npm run build
```
3. `chrome://extensions`에 접속합니다.
4. `압축해제된 확장 프로그램을 로드합니다.` 버튼을 눌러 빌드된 `dist` 폴더를 업로드합니다.
5. 생성된 `Enginear` extension을 실행합니다.


</div>
</details>

<br/>

## III. 예시 사진 자료

- 연동된 두 개의 Local Validator Node들이 블록을 쌓는 모습
<img width="1252" alt="image" src="https://user-images.githubusercontent.com/67793530/201623480-de719b02-fca9-4ecd-a9ce-8293cd8ce826.png">

<br/>

- Explorer
<img width="801" alt="image" src="https://user-images.githubusercontent.com/67793530/201623261-aad960ba-261a-4421-aa28-6504c05edc62.png">

<br/>

- Wallet
<img width="867" alt="image" src="https://user-images.githubusercontent.com/67793530/201623379-41146972-d70c-4a29-9758-de30bdff3e6a.png">

<br/>

## IV. 예시 영상 자료

https://user-images.githubusercontent.com/67793530/201623661-17266f46-cc5f-47b7-a4e5-797e420c11d8.mov
- 연결된 두 로컬 검증 노드가 쌓는 블록과, 한 노드에서 생성한 트랜잭션 데이터를 익스플로러에서 조회하는 모습

