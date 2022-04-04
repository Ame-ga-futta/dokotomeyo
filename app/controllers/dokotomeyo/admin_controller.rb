class Dokotomeyo::AdminController < ApplicationController
  def get_users
    render json: { status: 200 }
  end

  def get_parkings
    render json: { status: 200 }
  end

  def get_requirement_frees
    render json: { status: 200 }
  end

  def get_requirement_buys
    render json: { status: 200 }
  end

  def get_requirement_facilities
    render json: { status: 200 }
  end

  def get_requirement_times
    render json: { status: 200 }
  end

  def get_comments
    render json: { status: 200 }
  end

  def get_favorites
    render json: { status: 200 }
  end
end
