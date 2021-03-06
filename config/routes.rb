# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :sessions, only: %i[create destroy]
    resources :quizzes, only: %i[index update show create destroy]
    resources :questions, only: %i[update show create destroy index]
    resource :users, only: :create
    resource :attempt_answers, only: :create
    resources :attempts, only: :show
  end
  get "quizzes/slug/:id", to: "quizzes#set_slug"
  get "public/quiz/:slug", to: "quizzes#check_slug"
  get "quiz/report", to: "quizzes#report"

  # get "/export", to: "users#export"
  # get "/export_status/:id", to: "users#export_status"
  # get "/export_download/:id", to: "users#export_download"

  get "/export", to: "reports#export"
  get "/export_status/:id", to: "reports#export_status"
  get "/export_download/:id", to: "reports#export_download"
  root "home#index"
  get "*path", to: "home#index", via: :all
end
