Rails.application.routes.draw do
  namespace :dokotomeyo do
    get "/",                      to: "top#top"
    get :post,                    to: "top#post_form"
    get :login,                   to: "top#login_form"
    get :sign_up,                 to: "top#sign_up_form"
  end
end
