Rails.application.routes.draw do
  root to: redirect('/dokotomeyo')

  namespace :dokotomeyo do
    get    "/",                   to: "top#top"
    get    :mypage,               to: "top#top"
    get    :post,                 to: "top#top"
    get    :signup,               to: "top#top"
    get    :login,                to: "top#top"
    get    "/parking/:id",         to: "top#top"

    post   :signup,               to: 'sessions#signup'
    post   :login,                to: 'sessions#login'
    delete :logout,               to: 'sessions#logout'

    post   :confirm,              to: 'parkings#confirm'
    post   :post,                 to: 'parkings#create'
    post   :search,               to: 'parkings#search'
    post   :details,              to: 'parkings#details'
    post   :add_confirm,          to: 'parkings#add_confirm'
    post   :add_create,           to: 'parkings#add_create'
  end
end
