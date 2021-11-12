# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :sessions, only: %i[create destroy]
    resources :quizzes, only: %i[index update show create destroy]
    resources :questions, only: %i[update show create destroy]
  end
  root "home#index"
  get "*path", to: "home#index", via: :all
end
