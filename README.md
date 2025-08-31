# RemindersPlus: Full-Stack Апликација со GitOps и Kubernetes

**RemindersPlus** е модерна full-stack веб апликација за управување со потсетници, изградена со микросервисна архитектура и целосно подготвена за deployment и управување преку **GitOps** принципи со **Argo CD**.

Апликацијата овозможува корисниците да се регистрираат, најават и да креираат, прегледуваат, изменуваат и бришат свои лични потсетници, организирани по категории. Целиот проект е контејнеризиран со Docker, а конфигурацијата за распоредување е одвоена во посебен Git репозиториум, што овозможува целосна автоматизација и конзистентност.


| Главно Репо (Апликација) | Конфигурациско Репо (Kubernetes) | Docker Hub |
| :--- | :--- | :--- |
| [`AndrejT03/KIII_proekt`](https://github.com/AndrejT03/KIII_proekt) | [`AndrejT03/KIII_proekt-config`](https://github.com/AndrejT03/KIII_proekt-config) | [`andrejt12`](https://hub.docker.com/u/andrejt12) |

***


## Содржина
- [Архитектура со GitOps](#архитектура-со-gitops)
- [Технологии и Алатки](#технологии-и-алатки)
- [Функционалности](#функционалности)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment со Argo CD](#deployment-со-argo-cd)
- [Поставување на Локална Средина (Docker)](#поставување-на-локална-средина-docker)
- [Структура на Проектот](#структура-на-проектот)


## Архитектура со GitOps

Апликацијата следи модерна микросервисна архитектура, но со GitOps пристап, каде што Git служи како единствен извор на вистина за состојбата на апликацијата во Kubernetes.

1.  **Репо за Апликациски Код (`KIII_proekt`):** Го содржи изворниот код за backend (Spring Boot - Java) и frontend (React) апликациите. **CI (Continuous Integration)** процесот (GitHub Actions) автоматски гради, тестира и објавува Docker слики на Docker Hub при секоја промена.
2.  **Репо за Конфигурација (`KIII_proekt-config`):** Ги содржи сите Kubernetes манифести (YAML фајлови) кои ја дефинираат саканата состојба на апликацијата. **CD (Continuous Deployment)** алатката (Argo CD) го следи овој репозиториум и автоматски ги синхронизира промените со Kubernetes кластерот.
3.  **Docker Hub (`andrejt12`):** Служи како регистар за Docker сликите. Кога CI процесот ќе изгради нова верзија на слика, таа се објавува тука.
4.  **Kubernetes Кластер:** Го извршува Argo CD, кој ја повлекува конфигурацијата од `KIII_proekt-config` и ги распоредува соодветните Docker слики од Docker Hub.

## Технологии и Алатки
| Компонента | Технологија | Употреба |
| :--- | :--- | :--- |
| **Backend** | Spring Boot 3, Java 21, Maven | Развој на REST API |
| **Frontend** | React, Vite, Nginx | Изградба на UI и сервирање |
| **База** | PostgreSQL | Релациона база на податоци |
| **Контејнеризација** | Docker | Пакување на апликациите |
| **CI/CD** | GitHub Actions, Argo CD | Автоматизација и GitOps |
| **Deployment** | Kubernetes (Minikube) | Оркестрација на контејнери |


## Функционалности
- **Управување со корисници:** Регистрација и најава.
- **Автентикација:** Безбеден систем за најава со JSON Web Tokens (JWT).
- **CRUD Операции:** Креирање, преглед, измена и бришење на потсетници и категории.


## CI/CD Pipeline
Процесот е поделен на два дела:

1.  **CI (во `KIII_proekt` репото):**
    -   GitHub Actions се активира при `push` на `master` гранката.
    -   Автоматски го гради и тестира кодот.
    -   Ги гради Docker сликите за `backend` и `frontend`.
    -   Ги објавува новите слики на Docker Hub.

2.  **CD (со Argo CD):**
    -   Argo CD континуирано го следи `KIII_proekt-config` репозиториумот.
    -   Кога ќе се направат промени во манифестите (на пр. нова верзија на слика), Argo CD автоматски ги синхронизира промените со Kubernetes кластерот.


## Поставување на Локална Средина (Docker)
За локален развој и тестирање, можете да ја стартувате апликацијата со Docker.

**Чекори:**
1.  Клонирајте го главното репо:
    ```bash
    git clone https://github.com/AndrejT03/KIII_proekt.git
    cd KIII_proekt
    ```
2.  Изградете ги сликите:
    ```bash
    # Backend
    cd backend && ./mvnw clean package && docker build -t andrejt12/reminders-plus-backend:latest . && cd ..
    # Frontend
    cd frontend && docker build -t andrejt12/reminders-plus-frontend:latest . && cd ..
    ```
3.  Стартувајте со `docker-compose.yml`:
    ```bash
    docker-compose up --build
    ```


## Структура на Проектот

```
.
├── .github/               # GitHub Actions CI/CD workflow
├── backend/               # Backend (Spring Boot - Java)
├── frontend/              # Frontend (React + Vite)
└── docker-compose.yml     # Configuration file
```