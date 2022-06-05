# @Transactional

- Spring에서 제공하는 어노테이션으로 내부적으로 AOP를 통해 transaction처리됨
- Spring은 코드 삽입방식이 크게 2가지
    - 바이트 코드 생성(CGLIB)
    - 프록시 객체사용
    2가지 방법중 Spring은 기본적으로 프록시 객체를 사용하도록 선택되어서 interface가 반드시 필요
- SpringBoot는 기본적으로 바이트 코드 생성이(CGLib)선택됨. 때문에 interface가 따로 필요 없음

## isolation
- 원자성(Atomicity) : 한 트랜잭션 내에서 실행한 작업들은 하나로 간주(모두성공 or 모두실패)
- 일관성(Consistency) : 트랜잭션은 일관성 있는 데이더베이스 상태를 유지
- 격리성(Isolation) : 동시에 실행되는 트랜잭션들이 서로 영향을 미치지 않아얗마
- 지속성(Durability) : 트랜잭션을 성공적으로 마치면 결과가 항상 저장되어야함

## propagation
- 현재 진행중인 트랜잭션이 존재할 때 새로운 트랜잭션 메소드를 호출하는 경우 어떤 정책을 사용할지 정의함

- @Transaction은 다음과 같은 옵션을 제공
    - REQUIRED : 기본값이며 부모 트랜잭션이 존재할 경우 참여하고 없는 경우 새 트랜잭션 시작
    - SUPPORTS : 부모 트랜잭션이 존재할 경우 참여하고 없는 경우 non-transactional 상태로 실행
    - MANDATORY : 부모 트랜잭션이 있으면 참여하고 없으면 예외 발생
    - REQUIRES_NEW : 부모 트랜잭션을 무시하고 무조건 새로운 트랜잭션이 생성
    - NOT_UPPORTED : non-transactional 상태로 실행하며 부모 트랜잭션이 존재하는 경우 일시 정지시킴
    - NEVER : non-transactional 상태로 실행하며 부모 트랜잭션이 존재하는 경우 예외 발생

## rollbackFOR
- 기본값 : RuntimeException, Error
- 사용법 : @Transactional(rollbakcFor = {Exeption.class...})
- 사용할때 Exception을 하나면 지정하면 중괄호 생략가능
- rollbackFor 속성을 지정하면 특정 Exception시에 데이터 커밋하지 않고 롤백