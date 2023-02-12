import mongoose from 'mongoose';
import CardModel from '../models/card-model';
import { IUserSchema } from '../models/user-model';
import ApiError from '../exceptions/api-error';
import { CardServiceTypes } from './services-types';
import { RelatedCardSchemaKeys } from '../models/models-types';

async function postCard(
  props: CardServiceTypes.PostCardProps
): CardServiceTypes.PostCardReturn {
  const { ownerId, name, link } = props;
  try {
    const card = new CardModel({ name, link, owner: ownerId });

    const preservedCard = await card.save();

    const populatedPreservedCard = await preservedCard.populate(
      RelatedCardSchemaKeys.owner
    );

    return populatedPreservedCard;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw ApiError.BadRequest(error.message);
    }
    throw ApiError.InternalError();
  }
}

async function getCards(): CardServiceTypes.GetCardsReturn {
  try {
    const preservedCards = await CardModel.find({}).populate([
      RelatedCardSchemaKeys.owner,
      RelatedCardSchemaKeys.likes,
    ]);

    return preservedCards;
  } catch (error) {
    throw ApiError.InternalError();
  }
}

async function deleteCard(
  props: CardServiceTypes.DeleteCardProps
): CardServiceTypes.DeleteCardReturn {
  try {
    const { cardId, userId } = props;

    const preservedCard = await CardModel.findById(cardId).populate<{
      owner: IUserSchema;
      likes: IUserSchema[];
    }>([RelatedCardSchemaKeys.likes, RelatedCardSchemaKeys.owner]);

    if (preservedCard === null) {
      throw ApiError.NotFound();
    }

    if (preservedCard.owner.id !== userId) {
      throw ApiError.Forbidden();
    }

    const deletedCard = await preservedCard.delete();

    return deletedCard;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof mongoose.Error.CastError) {
      throw ApiError.BadRequest('incorrect id template');
    }

    throw ApiError.InternalError();
  }
}

async function likeCard(
  props: CardServiceTypes.LikeCardProps
): CardServiceTypes.LikeCardReturn {
  try {
    const { cardId, userId } = props;

    const preservedCard = await CardModel.findByIdAndUpdate(
      cardId,
      {
        $addToSet: { likes: userId },
      },
      { new: true }
    ).populate([RelatedCardSchemaKeys.likes, RelatedCardSchemaKeys.owner]);

    if (preservedCard === null) {
      throw ApiError.NotFound();
    }
    return preservedCard;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof mongoose.Error.CastError) {
      throw ApiError.BadRequest('incorrect id template');
    }

    throw ApiError.InternalError();
  }
}

async function dislikeCard(
  props: CardServiceTypes.DislikeCardProps
): CardServiceTypes.DislikeCardReturn {
  try {
    const { cardId, userId } = props;

    const preservedCard = await CardModel.findByIdAndUpdate(
      cardId,
      {
        $pull: { likes: userId },
      },
      { new: true }
    ).populate([RelatedCardSchemaKeys.likes, RelatedCardSchemaKeys.owner]);

    if (preservedCard === null) {
      throw ApiError.NotFound();
    }
    return preservedCard;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof mongoose.Error.CastError) {
      throw ApiError.BadRequest('incorrect id template');
    }

    throw ApiError.InternalError();
  }
}

export default { postCard, getCards, deleteCard, likeCard, dislikeCard };
